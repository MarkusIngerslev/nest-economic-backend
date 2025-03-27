import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Income } from './income.entity';
import { IncomeService } from './income.service';
import { IncomeController } from './income.controller';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Income, User])],
  controllers: [IncomeController],
  providers: [IncomeService],
})
export class IncomeModule {}
