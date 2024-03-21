import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Terms {
  @PrimaryGeneratedColumn()
  public id: string;

  @OneToOne(() => User, (user: User) => user.terms)
  public user?: User;

  @Column({ default: false })
  public fourteenOver: boolean;

  @Column({ default: false })
  public agreeOfTerms: boolean;

  @Column({ default: false })
  public personalInfo: boolean;

  @Column({ default: false })
  public MarketingAgree: boolean;

  @Column({ default: false })
  public etc: boolean;
}
