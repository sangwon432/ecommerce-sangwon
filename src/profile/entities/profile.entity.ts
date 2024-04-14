import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '@common/base.entity';
import { User } from '@user/entities/user.entity';
import { Gender } from '@common/enums/gender.enum';
import { BloodType } from '@common/enums/bloodType.enum';
import { EducationLevel } from '@common/enums/education-level.enum';
import { Religion } from '@common/enums/religion.enum';

@Entity()
export class Profile extends BaseEntity {
  @OneToOne(() => User, (user: User) => user.profile)
  @JoinColumn()
  public user: User;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.Man,
  })
  public gender: Gender;

  // 성별 / 생년월일/ 집주소 / 혈액형 / MBTI
  @Column()
  public birth: Date;

  @Column()
  public homeAddress: string;

  @Column({
    type: 'enum',
    enum: BloodType,
    default: BloodType.Type_B,
  })
  public bloodType: BloodType;

  @Column()
  public mbti: string;

  @Column()
  public isMarried: boolean;

  @Column()
  public hasChildren: boolean;

  @Column({
    type: 'enum',
    enum: Religion,
    default: Religion.Others,
  })
  public religion: Religion;
}

///////////////////////
