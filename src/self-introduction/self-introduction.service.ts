import { Injectable } from '@nestjs/common';
import { CreateSelfIntroductionDto } from './dto/create-self-introduction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SelfIntroduction } from '@root/self-introduction/entities/self-introduction.entity';
import { Repository } from 'typeorm';
import { UserService } from '@user/user.service';
import { User } from '@user/entities/user.entity';

@Injectable()
export class SelfIntroductionService {
  constructor(
    @InjectRepository(SelfIntroduction)
    private selfIntroductionRepository: Repository<SelfIntroduction>,
    private readonly userService: UserService,
  ) {}

  async createSelfIntroduction(
    user: User,
    createSelfIntroductionDto: CreateSelfIntroductionDto,
  ) {
    const newSelfIntroduction = await this.selfIntroductionRepository.create({
      ...createSelfIntroductionDto,
      user,
    });

    const savedSelfIntroduction =
      await this.selfIntroductionRepository.save(newSelfIntroduction);
    await this.userService.updateUserInfo(user, savedSelfIntroduction);
    return newSelfIntroduction;
  }

  async updateSelfIntroduction(
    user: User,
    updateSelfIntroductionDto?: CreateSelfIntroductionDto,
  ) {
    return await this.selfIntroductionRepository.update(
      user.selfIntroduction.id,
      {
        ...updateSelfIntroductionDto,
      },
    );
  }

  // async getSelfIntroductionInfo(user: User) {
  //   return user.selfIntroduction;
  // }
}
