import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '@profile/entities/profile.entity';
import { Repository } from 'typeorm';
import { UserService } from '@user/user.service';
import { User } from '@user/entities/user.entity';
import { CreateProfileDto } from '@profile/dto/create-profile.dto';
import { UpdateProfileDto } from '@profile/dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private readonly userService: UserService,
  ) {}

  async createProfile(
    user: User,
    createProfileDto: CreateProfileDto,
  ): Promise<Profile> {
    const newProfile = await this.profileRepository.create({
      ...createProfileDto,
      user,
    });

    console.log('+++++++++++++new profile: ', newProfile);
    const savedProfile = await this.profileRepository.save(newProfile);
    await this.userService.updateUserInfo(user, savedProfile);
    return newProfile;
  }

  async updateProfile(user: User, updateProfileDto?: UpdateProfileDto) {
    return await this.profileRepository.update(user.profile.id, {
      ...updateProfileDto,
    });
  }
}
