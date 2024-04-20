import { Profile } from '@profile/entities/profile.entity';
import { Repository } from 'typeorm';
import { UserService } from '@user/user.service';
import { User } from '@user/entities/user.entity';
import { CreateProfileDto } from '@profile/dto/create-profile.dto';
import { UpdateProfileDto } from '@profile/dto/update-profile.dto';
export declare class ProfileService {
    private profileRepository;
    private readonly userService;
    constructor(profileRepository: Repository<Profile>, userService: UserService);
    createProfile(user: User, createProfileDto: CreateProfileDto): Promise<Profile>;
    updateProfile(user: User, updateProfileDto?: UpdateProfileDto): Promise<import("typeorm").UpdateResult>;
}
