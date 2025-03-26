import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIncomeDto } from './dtos/create-income.dto';
import { Income } from './income.entity';
import { User } from '../users/users.entity';
import { UUID } from 'crypto';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Income)
    private incomeRepo: Repository<Income>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createIncome(userId: UUID, data: CreateIncomeDto) {
    const user = await this.userRepo.findOneOrFail({ where: { id: userId } });
    const income = this.incomeRepo.create({ ...data, user });
    return this.incomeRepo.save(income);
  }

  async getIncomesForUser(userId: UUID) {
    return this.incomeRepo.find({
      where: { user: { id: userId } },
    });
  }

  async getAllIncomes() {
    return this.incomeRepo.find({ relations: ['user'] });
  }
}
