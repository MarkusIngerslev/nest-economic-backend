import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './expense.entity';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, User])],
  providers: [ExpenseService],
  controllers: [ExpenseController],
})
export class ExpenseModule {}
