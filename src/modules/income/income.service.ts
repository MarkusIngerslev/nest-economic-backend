import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { Income } from './income.entity';
import { User } from '../user/user.entity';
import { UUID } from 'crypto';
import { CategoryService } from '../category/category.service';
import { CategoryType } from 'src/helper/enum/category.enum';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Income)
    private incomeRepo: Repository<Income>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private categoryService: CategoryService,
  ) {}

  async createIncome(userId: string, data: CreateIncomeDto) {
    const user = await this.userRepo.findOneOrFail({ where: { id: userId } });
    const category = await this.categoryService.findOneByIdAndType(
      data.categoryId,
      CategoryType.INCOME,
    );

    const income = this.incomeRepo.create({
      ...data,
      date: data.date ?? new Date(),
      category,
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

    const { categoryId, ...otherUpdateData } = dto;

    if (categoryId) {
      const category = await this.categoryService.findOneByIdAndType(
        categoryId,
        CategoryType.INCOME,
      );

      if (!category) {
        throw new NotFoundException(
          `Category with ID ${categoryId} not found or is not an income category`,
        );
      }

      income.category = category;
    }

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
