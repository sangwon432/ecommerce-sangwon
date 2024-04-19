import { BaseEntity } from '../../common/base.entity';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as gravatar from 'gravatar';
import { Provider } from './provider.enum';
import { Role } from './role.enum';
import { Exclude } from 'class-transformer';
import { Terms } from './terms.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { Profile } from '@profile/entities/profile.entity';
import { Education } from '@root/education/entities/education.entity';
import { SelfIntroduction } from '@root/self-introduction/entities/self-introduction.entity';

@Entity()
export class User extends BaseEntity {
  // username, email, password,
  @Column()
  public username: string;

  @Column({ unique: true })
  public email: string;

  @Column({ nullable: true })
  @Exclude()
  public password?: string;

  @Column({ nullable: true })
  public profileImg?: string;

  @Column({
    type: 'enum',
    enum: Provider,
    default: Provider.LOCAL,
  })
  public provider: Provider;

  //롤에 대한 부분을 추가
  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.USER],
  })
  public roles: Role[];

  @OneToOne(() => Terms, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  // @ApiProperty({ type: Consent })
  public terms: Terms;

  @OneToOne(() => Profile, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  // @ApiProperty({ type: Consent })
  public profile: Profile;

  @OneToOne(() => Education, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public education: Education;

  @OneToOne(() => SelfIntroduction, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public selfIntroduction: SelfIntroduction;

  @Column({ default: false })
  public isDeleted?: boolean;

  @Column({ type: 'timestamp', nullable: true })
  public deleteRequestedAt: Date;

  @BeforeInsert()
  async beforeSaveFunction(): Promise<void> {
    try {
      if (this.provider !== Provider.LOCAL) {
        return;
      }
      // profile image 자동 생성
      this.profileImg = gravatar.url(this.email, {
        s: '200',
        r: 'pg',
        d: 'mm',
        protocol: 'https',
      });

      //password 암호화
      const saltValue = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, saltValue);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }
}
