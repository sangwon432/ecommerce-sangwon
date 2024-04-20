import { SelfIntroductionService } from './self-introduction.service';
import { RequestWithUserInterface } from '@auth/interfaces/requestWithUser.interface';
import { CreateSelfIntroductionDto } from '@root/self-introduction/dto/create-self-introduction.dto';
export declare class SelfIntroductionController {
    private readonly selfIntroductionService;
    constructor(selfIntroductionService: SelfIntroductionService);
    createSelfIntroduction(req: RequestWithUserInterface, createSelfIntroductionDto: CreateSelfIntroductionDto): Promise<import("./entities/self-introduction.entity").SelfIntroduction>;
    updateSelfIntroduction(req: RequestWithUserInterface, updateSelfIntroductionDto: CreateSelfIntroductionDto): Promise<import("typeorm").UpdateResult>;
    getSelfIntroductionInfo(req: RequestWithUserInterface): Promise<import("./entities/self-introduction.entity").SelfIntroduction>;
}
