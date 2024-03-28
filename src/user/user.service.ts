import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { CACHE_MANAGER } from '@nestjs/common/cache';
import * as bcrypt from 'bcryptjs';
import { Cache } from 'cache-manager';
import { use } from 'passport';
import { exBufferedFile } from '../minio-client/file.model';
import { MinioClientService } from '../minio-client/minio-client.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly minioClientService: MinioClientService,
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

  async updateProfileImg(userId: string, profileImg: exBufferedFile) {
    const uploaded_image = await this.minioClientService.uploadProfileImg(
      userId,
      profileImg,
    );

    console.log('++++++++++++++++++++++++');

    return await this.userRepository.update(
      { id: userId },
      { profileImg: `${uploaded_image.url}` },
    );
  }

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

  async updateProfile(user: User, updateUserDto?: CreateUserDto) {
    // const user = await this.userRepository.findOneBy({ id });

    const saltValue = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(updateUserDto.password, saltValue);

    return await this.userRepository.update(user.id, {
      ...updateUserDto,
      password: hashedPassword,
    });
  }
}
