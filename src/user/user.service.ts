import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/common/cache';
import * as bcrypt from 'bcryptjs';
import { Cache } from 'cache-manager';
import { UpdateUserDto } from './dto/update-user.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { User } from '@user/entities/user.entity';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { MinioClientService } from '@minio-client/minio-client.service';
import { EmailService } from '@email/email.service';
import { exBufferedFile } from '@minio-client/file.model';
import { Profile } from '@profile/entities/profile.entity';
import { Education } from '@root/education/entities/education.entity';
import { SelfIntroduction } from '@root/self-introduction/entities/self-introduction.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly minioClientService: MinioClientService,
    private readonly emailService: EmailService,
  ) {}

  async getAllUserInfo() {
    return await this.userRepository.find();
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user) return user;
    throw new HttpException('no user', HttpStatus.NOT_FOUND);
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (user) return user;
    throw new HttpException('no user', HttpStatus.NOT_FOUND);
  }

  // refresh token 저장
  async setCurrentRefreshTokenToRedis(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.cacheManager.set(userId, currentHashedRefreshToken);
  }

  //refreh 토큰 삭제

  async removeRefreshTokenFromRedis(userId: string) {
    await this.cacheManager.del(userId);
  }

  // 레디스(암호화된 refreshToken)와 쿠키에 있는 토큰의 매칭 여부 확인
  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.getUserById(userId);
    const getUserIdFromRedis = await this.cacheManager.get(userId);
    const isRefreshTokenMatched = await bcrypt.compare(
      refreshToken,
      getUserIdFromRedis,
    );
    if (isRefreshTokenMatched) return user;
  }

  // async updateProfileImg(user: User, profileImg: exBufferedFile) {
  //   const uploaded_image = await this.minioClientService.uploadProfileImg(
  //     user.id,
  //     profileImg,
  //   );
  //
  //   console.log('++++++++++++++++++++++++');
  //
  //   return await this.userRepository.update(
  //     { id: user.id },
  //     { profileImg: `${uploaded_image.url}` },
  //   );
  // }

  /////////////
  // In userService
  // async updatePassword(userId: string, newPassword: string): Promise<void> {
  //   await this.userRepository.update(userId, { password: newPassword });
  // }

  async changePassword(email: string, password: string) {
    // const user = await this.userRepository.findOneBy({ email });
    const saltValue = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, saltValue);
    // return await this.userRepository.save(user);

    return await this.userRepository.update(
      { email },
      { password: newPassword },
    );
  }

  // async updateProfile(user: User, updateUserDto?: UpdateUserDto) {
  //   // const user = await this.userRepository.findOneBy({ id });
  //
  //   return await this.userRepository.update(user.id, {
  //     ...updateUserDto,
  //   });
  // }

  async updateProfileFromToken(
    user: User,
    updateUserDto?: UpdateUserDto,
    profileImg?: exBufferedFile,
  ) {
    console.log(profileImg);
    const uploaded_image = await this.minioClientService.uploadProfileImg(
      user.id,
      profileImg,
    );

    return await this.userRepository.update(user.id, {
      ...updateUserDto,
      profileImg: `${uploaded_image.url}`,
    });
  }

  async deleteUser(user: User) {
    return await this.userRepository.update(user.id, {
      isDeleted: true,
      deleteRequestedAt: new Date(),
    });
  }

  async cancelDeleteUserRequest(user: User) {
    return await this.userRepository.update(user.id, {
      isDeleted: false,
      deleteRequestedAt: null,
    });
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async removeDeleteUser() {
    const deletionThreshold = new Date();
    deletionThreshold.setDate(deletionThreshold.getDate());
    await this.userRepository.delete({
      isDeleted: true,
      deleteRequestedAt: LessThan(deletionThreshold),
    });
  }

  //5초마다 이메일 보내기 (cron 테스트용)
  // @Cron(CronExpression.EVERY_5_SECONDS)
  // async testCron() {
  //   await this.emailService.sendMail({
  //     to: 'swonl0622@gmail.com',
  //     subject: 'cron test',
  //     text: 'cron test',
  //   });
  //   console.log('Cron test');
  // }

  async updateUserInfo(
    user: User,
    info: Profile | Education | SelfIntroduction,
  ) {
    const existedUser = await this.userRepository.findOneBy({
      id: user.id,
    });

    if (!existedUser) throw new Error('User not found');
    // existedUser.profile = info;
    if (this.isProfile(info)) {
      existedUser.profile = info;
    } else if (this.isEducation(info)) {
      existedUser.education = info;
    } else if (this.isSelfIntroduction(info)) {
      existedUser.selfIntroduction = info;
    }
    return await this.userRepository.save(existedUser);
  }

  private isProfile(
    info: Profile | Education | SelfIntroduction,
  ): info is Profile {
    return (info as Profile).mbti !== undefined;
  }

  private isEducation(
    info: Education | Profile | SelfIntroduction,
  ): info is Education {
    return (info as Education).highschoolName !== undefined;
  }

  private isSelfIntroduction(
    info: Education | Profile | SelfIntroduction,
  ): info is SelfIntroduction {
    return (info as SelfIntroduction).interests !== undefined;
  }

  // async updateUserEducation(user: User, info: Education) {
  //   const existedUser = await this.userRepository.findOneBy({
  //     id: user.id,
  //   });
  //
  //   if (!existedUser) throw new Error('User not found');
  //   existedUser.education = info;
  //   return await this.userRepository.save(existedUser);
  // }
}
