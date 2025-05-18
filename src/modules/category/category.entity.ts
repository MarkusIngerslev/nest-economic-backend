import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CategoryType } from 'src/helper/enum/category.enum';
import { User } from '../user/user.entity';

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

  @ManyToOne(() => User, (user) => user.categories, { onDelete: 'CASCADE' }) // Tilføj relation til User
  user: User;
}
