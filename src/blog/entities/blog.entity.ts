import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

@Entity()
export class Blog extends BaseEntity {
  @Column()
  public title: string;

  @Column()
  public desc: string;

  @Column()
  public category: string;
}
