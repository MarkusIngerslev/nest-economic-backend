import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './expense.entity';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { CategoryModule } from '../category/category.module';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, User]), CategoryModule],
  providers: [ExpenseService],
  controllers: [ExpenseController],
})
export class ExpenseModule {}
