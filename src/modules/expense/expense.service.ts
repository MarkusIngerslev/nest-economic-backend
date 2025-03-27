import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { UpdateExpenseDto } from './dtos/update-expense.dto';
import { Expense } from './expense.entity';
import { User } from '../users/users.entity';
import { UUID } from 'crypto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepo: Repository<Expense>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createExpense(userId: string, data: CreateExpenseDto) {
    const user = await this.userRepo.findOneOrFail({ where: { id: userId } });

    const expense = this.expenseRepo.create({
      ...data,
      date: data.date ?? new Date(),
      user,
    });

    return this.expenseRepo.save(expense);
  }

  async getExpensesForUser(userId: UUID) {
    return this.expenseRepo.find({
      where: { user: { id: userId } },
      order: { date: 'DESC' },
    });
  }

  async getAllExpenses() {
    return this.expenseRepo.find({
      relations: ['user'],
      order: { date: 'DESC' },
    });
  }

  async getExpenseByIdForUser(
    expenseId: string,
    requesterId: string,
    isAdmin = false,
  ) {
    const whereClause = isAdmin
      ? { id: expenseId }
      : { id: expenseId, user: { id: requesterId } };

    const expense = await this.expenseRepo.findOne({
      where: whereClause,
      relations: ['user'],
    });

    if (!expense) {
      throw new NotFoundException('expense not found');
    }

    return expense;
  }

  async updateExpense(
    expenseId: string,
    userId: string,
    dto: UpdateExpenseDto,
    isAdmin = false,
  ) {
    const expense = await this.getExpenseByIdForUser(
      expenseId,
      userId,
      isAdmin,
    );
    Object.assign(expense, dto);
    return this.expenseRepo.save(expense);
  }

  async deleteExpense(
    expenseId: string,
    userId: string,
    isAdmin = false,
  ): Promise<void> {
    const expense = await this.getExpenseByIdForUser(
      expenseId,
      userId,
      isAdmin,
    );
    await this.expenseRepo.remove(expense);
  }
}
