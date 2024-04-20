import { Education } from '@root/education/entities/education.entity';
import { Repository } from 'typeorm';
import { UserService } from '@user/user.service';
import { User } from '@user/entities/user.entity';
import { CreateEducationDto } from '@root/education/dto/create-education.dto';
export declare class EducationService {
    private educationRepository;
    private readonly userService;
    constructor(educationRepository: Repository<Education>, userService: UserService);
    createEducation(user: User, createEducationDto: CreateEducationDto): Promise<Education>;
    updateEducation(user: User, updateEducationDto?: CreateEducationDto): Promise<import("typeorm").UpdateResult>;
}
