import { Controller } from '@nestjs/common';
import { IncomeService } from './income.service';
import { Body, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { CreateIncomeDto } from './dtos/create-income.dto';
import { Role } from '../auth/roles/roles.enum';

@UseGuards(JwtGuard)
@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  async create(@Req() req, @Body() dto: CreateIncomeDto) {
    return this.incomeService.createIncome(req.user.userId, dto);
  }

  @Get('me')
  async myIncomes(@Req() req) {
    return this.incomeService.getIncomesForUser(req.user.userId);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async getAll() {
    return this.incomeService.getAllIncomes();
  }
}
