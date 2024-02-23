import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

@Entity()
export class Product extends BaseEntity {
  @Column()
  public name: string;

  @Column()
  public desc: string;

  @Column()
  public price: number;

  @Column()
  public category: string;

  @Column({ default: true })
  public isSales: boolean;

  @Column()
  public img: string;

  @Column()
  public company: string;
}
