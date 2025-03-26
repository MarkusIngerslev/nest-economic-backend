import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export class Income {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  amount: number;

  @Column()
  category: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.incomes, { onDelete: 'CASCADE' })
  user: User;
}
