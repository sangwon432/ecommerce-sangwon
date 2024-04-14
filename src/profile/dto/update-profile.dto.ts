// import { PartialType } from '@nestjs/swagger';
// import { CreateProfileDto } from './create-profile.dto';
//
// export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
//
import { Gender } from '@common/enums/gender.enum';
import { BloodType } from '@common/enums/bloodType.enum';

export class UpdateProfileDto {
  gender: Gender;
  birth: Date;
  homeAddress: string;
  bloodType: BloodType;
  mbti: string;
}
