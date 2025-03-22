import { UUID } from 'crypto';
import { Role } from '../auth/roles/roles.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id?: UUID;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'text', // Brug 'text' i stedet for 'enum'
    array: true,
    default: [Role.USER],
  })
  roles: Role[];
}
