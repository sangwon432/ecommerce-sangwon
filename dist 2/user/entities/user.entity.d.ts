import { BaseEntity } from '../../common/base.entity';
import { Provider } from './provider.enum';
import { Role } from './role.enum';
import { Terms } from './terms.entity';
import { Profile } from '@profile/entities/profile.entity';
import { Education } from '@root/education/entities/education.entity';
import { SelfIntroduction } from '@root/self-introduction/entities/self-introduction.entity';
export declare class User extends BaseEntity {
    username: string;
    email: string;
    password?: string;
    profileImg?: string;
    provider: Provider;
    roles: Role[];
    terms: Terms;
    profile: Profile;
    education: Education;
    selfIntroduction: SelfIntroduction;
    isDeleted?: boolean;
    deleteRequestedAt: Date;
    beforeSaveFunction(): Promise<void>;
}
