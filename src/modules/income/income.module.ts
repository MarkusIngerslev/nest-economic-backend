import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Income } from './income.entity';
import { IncomeService } from './income.service';
import { IncomeController } from './income.controller';
import { User } from '../user/user.entity';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Income, User]), CategoryModule],
  controllers: [IncomeController],
  providers: [IncomeService],
})
export class IncomeModule {}
