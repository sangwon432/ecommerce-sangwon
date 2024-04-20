import { BaseEntity } from '@common/base.entity';
import { User } from '@user/entities/user.entity';
export declare class SelfIntroduction extends BaseEntity {
    user: User;
    personality: string;
    interests: string;
    socialMediaLinks: string;
}
