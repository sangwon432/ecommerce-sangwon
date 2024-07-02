import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from '@profile/profile.service';
import { AccessTokenGuard } from '@auth/guards/access-token.guard';
import { RequestWithUserInterface } from '@auth/interfaces/requestWithUser.interface';
import { CreateProfileDto } from '@profile/dto/create-profile.dto';
import { Profile } from '@profile/entities/profile.entity';
import { UpdateProfileDto } from '@profile/dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  async createProfile(
    @Req() req: RequestWithUserInterface,
    @Body() createProfileDto: CreateProfileDto,
  ): Promise<Profile> {
    console.log('req', req.user);
    return await this.profileService.createProfile(req.user, createProfileDto);
  }

  // @Put()
  // @UseGuards(AccessTokenGuard)
  // async updateProfile(
  //   @Req() req: RequestWithUserInterface,
  //   @Body() updateProfileDto?: UpdateProfileDto,
  // ) {
  //   return await this.profileService.updateProfile(req.user, updateProfileDto);
  // }

  @UseGuards(AccessTokenGuard)
  @Put()
  async updateProfile(
    @Req() req: RequestWithUserInterface,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return await this.profileService.updateProfile(req.user, updateProfileDto);
  }
}
