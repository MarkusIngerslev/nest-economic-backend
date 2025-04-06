import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { UUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  findById(id: UUID): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  create(data: Partial<User>): User {
    return this.usersRepository.create(data);
  }

  async save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  update(id: UUID, userInformation: Partial<User>): Promise<UpdateResult> {
    return this.usersRepository.update(id, userInformation);
  }
}
