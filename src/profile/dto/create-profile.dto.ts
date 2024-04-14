import { Gender } from '@common/enums/gender.enum';
import { BloodType } from '@common/enums/bloodType.enum';

export class CreateProfileDto {
  gender: Gender;
  birth: Date;
  homeAddress: string;
  bloodType: BloodType;
  mbti: string;
}
