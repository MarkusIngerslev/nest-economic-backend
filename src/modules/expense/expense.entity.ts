import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  amount: number;

  @ManyToOne(() => Category, { eager: true })
  category: Category;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'date', nullable: true })
  date?: Date;

  @ManyToOne(() => User, (user) => user.expense, { onDelete: 'CASCADE' })
  user: User;
}
