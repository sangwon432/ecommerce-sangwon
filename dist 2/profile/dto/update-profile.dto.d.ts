import { Gender } from '@common/enums/gender.enum';
import { BloodType } from '@common/enums/bloodType.enum';
export declare class UpdateProfileDto {
    gender: Gender;
    birth: Date;
    homeAddress: string;
    bloodType: BloodType;
    mbti: string;
}
