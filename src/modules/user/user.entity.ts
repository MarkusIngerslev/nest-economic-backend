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

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  birthDate?: Date;

  @Column({ nullable: true })
  profilePictureUrl?: string;

  // @Column({ nullable: true })
  // createdAt?: Date;

  // @Column({ nullable: true })
  // updatedAt?: Date;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  postalCode?: string;

  @Column({ nullable: true })
  country?: string;

  @OneToMany(() => Income, (income) => income.user)
  incomes?: Income[];

  @OneToMany(() => Expense, (expense) => expense.user)
  expense?: Expense[];
}
