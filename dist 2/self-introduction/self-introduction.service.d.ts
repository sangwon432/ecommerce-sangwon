import { CreateSelfIntroductionDto } from './dto/create-self-introduction.dto';
import { SelfIntroduction } from '@root/self-introduction/entities/self-introduction.entity';
import { Repository } from 'typeorm';
import { UserService } from '@user/user.service';
import { User } from '@user/entities/user.entity';
export declare class SelfIntroductionService {
    private selfIntroductionRepository;
    private readonly userService;
    constructor(selfIntroductionRepository: Repository<SelfIntroduction>, userService: UserService);
    createSelfIntroduction(user: User, createSelfIntroductionDto: CreateSelfIntroductionDto): Promise<SelfIntroduction>;
    updateSelfIntroduction(user: User, updateSelfIntroductionDto?: CreateSelfIntroductionDto): Promise<import("typeorm").UpdateResult>;
}
