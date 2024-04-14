import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '@common/base.entity';
import { User } from '@user/entities/user.entity';
import { EducationLevel } from '@common/enums/education-level.enum';

@Entity()
export class Education extends BaseEntity {
  @OneToOne(() => User, (user: User) => user.education)
  @JoinColumn()
  public user: User;

  @Column()
  public highschoolName: string;

  @Column()
  public universityName: string;

  @Column('text', { array: true, nullable: true })
  public fieldOfStudy: string[];

  @Column({
    type: 'enum',
    enum: EducationLevel,
    default: EducationLevel.highSchoolGraduation,
  })
  public educationLevel: EducationLevel;
}
