import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '@common/base.entity';
import { User } from '@user/entities/user.entity';
import { use } from 'passport';

@Entity()
export class SelfIntroduction extends BaseEntity {
  @OneToOne(() => User, (user: User) => user.selfIntroduction)
  @JoinColumn()
  public user: User;

  @Column()
  public personality: string;

  @Column()
  interests: string;

  @Column()
  socialMediaLinks: string;
}
