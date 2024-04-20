import { BaseEntity } from '@common/base.entity';
import { User } from '@user/entities/user.entity';
import { Gender } from '@common/enums/gender.enum';
import { BloodType } from '@common/enums/bloodType.enum';
import { Religion } from '@common/enums/religion.enum';
export declare class Profile extends BaseEntity {
    user: User;
    gender: Gender;
    birth: Date;
    homeAddress: string;
    bloodType: BloodType;
    mbti: string;
    isMarried: boolean;
    hasChildren: boolean;
    religion: Religion;
}
