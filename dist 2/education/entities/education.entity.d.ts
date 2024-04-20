import { BaseEntity } from '@common/base.entity';
import { User } from '@user/entities/user.entity';
import { EducationLevel } from '@common/enums/education-level.enum';
export declare class Education extends BaseEntity {
    user: User;
    highschoolName: string;
    universityName: string;
    fieldOfStudy: string[];
    educationLevel: EducationLevel;
}
