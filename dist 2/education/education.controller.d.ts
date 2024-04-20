import { EducationService } from './education.service';
import { RequestWithUserInterface } from '@auth/interfaces/requestWithUser.interface';
import { CreateEducationDto } from '@root/education/dto/create-education.dto';
export declare class EducationController {
    private readonly educationService;
    constructor(educationService: EducationService);
    createEducation(req: RequestWithUserInterface, createEducationDto: CreateEducationDto): Promise<import("./entities/education.entity").Education>;
    updateEducation(req: RequestWithUserInterface, updateEducationDto: CreateEducationDto): Promise<import("typeorm").UpdateResult>;
}
