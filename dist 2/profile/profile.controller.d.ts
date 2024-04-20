import { ProfileService } from '@profile/profile.service';
import { RequestWithUserInterface } from '@auth/interfaces/requestWithUser.interface';
import { CreateProfileDto } from '@profile/dto/create-profile.dto';
import { Profile } from '@profile/entities/profile.entity';
import { UpdateProfileDto } from '@profile/dto/update-profile.dto';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    createProfile(req: RequestWithUserInterface, createProfileDto: CreateProfileDto): Promise<Profile>;
    updateProfile(req: RequestWithUserInterface, updateProfileDto: UpdateProfileDto): Promise<import("typeorm").UpdateResult>;
}
