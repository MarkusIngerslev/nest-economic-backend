import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role } from '../../helper/enum/roles.enum';
import { Income } from '../income/income.entity';
import { Expense } from '../expense/expense.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'text',
    array: true,
    default: [Role.USER],
  })
  roles: Role[];

  @OneToMany(() => Income, (income) => income.user)
  incomes?: Income[];

  @OneToMany(() => Expense, (expense) => expense.user)
  expense?: Expense[];
}
