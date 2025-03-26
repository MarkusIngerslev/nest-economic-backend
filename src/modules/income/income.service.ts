import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIncomeDto } from './dtos/create-income.dto';
import { UpdateIncomeDto } from './dtos/update-income.dto';
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

  async createIncome(userId: string, data: CreateIncomeDto) {
    const user = await this.userRepo.findOneOrFail({ where: { id: userId } });

    const income = this.incomeRepo.create({
      ...data,
      date: data.date ?? new Date(),
      user,
    });

    return this.incomeRepo.save(income);
  }

  async getIncomesForUser(userId: UUID) {
    return this.incomeRepo.find({
      where: { user: { id: userId } },
      order: { date: 'DESC' },
    });
  }

  async getAllIncomes() {
    return this.incomeRepo.find({
      relations: ['user'],
      order: { date: 'DESC' },
    });
  }

  async getIncomeByIdForUser(
    incomeId: string,
    requesterId: string,
    isAdmin = false,
  ) {
    const whereClause = isAdmin
      ? { id: incomeId }
      : { id: incomeId, user: { id: requesterId } };

    const income = await this.incomeRepo.findOne({
      where: whereClause,
      relations: ['user'],
    });

    if (!income) {
      throw new NotFoundException('Income not found');
    }

    return income;
  }

  async updateIncome(
    incomeId: string,
    userId: string,
    dto: UpdateIncomeDto,
    isAdmin = false,
  ) {
    const income = await this.getIncomeByIdForUser(incomeId, userId, isAdmin);
    Object.assign(income, dto);
    return this.incomeRepo.save(income);
  }

  async deleteIncome(
    incomeId: string,
    userId: string,
    isAdmin = false,
  ): Promise<void> {
    const income = await this.getIncomeByIdForUser(incomeId, userId, isAdmin);
    await this.incomeRepo.remove(income);
  }
}
