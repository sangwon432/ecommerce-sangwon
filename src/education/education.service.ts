import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Education } from '@root/education/entities/education.entity';
import { Repository } from 'typeorm';
import { UserService } from '@user/user.service';
import { User } from '@user/entities/user.entity';
import { CreateEducationDto } from '@root/education/dto/create-education.dto';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private educationRepository: Repository<Education>,
    private readonly userService: UserService,
  ) {}

  async createEducation(user: User, createEducationDto: CreateEducationDto) {
    const newEducation = await this.educationRepository.create({
      ...createEducationDto,
      user,
    });

    const savedEducation = await this.educationRepository.save(newEducation);
    await this.userService.updateUserInfo(user, savedEducation);
    return newEducation;
  }

  async updateEducation(user: User, updateEducationDto?: CreateEducationDto) {
    return await this.educationRepository.update(user.education.id, {
      ...updateEducationDto,
    });
  }
}
