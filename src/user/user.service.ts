import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { CACHE_MANAGER } from '@nestjs/common/cache';
import * as bcrypt from 'bcryptjs';
import { Cache } from 'cache-manager';
import { use } from 'passport';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
}
