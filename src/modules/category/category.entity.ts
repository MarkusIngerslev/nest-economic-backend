import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CategoryType } from 'src/helper/enum/category.enum';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: CategoryType,
  })
  type: CategoryType;
}
