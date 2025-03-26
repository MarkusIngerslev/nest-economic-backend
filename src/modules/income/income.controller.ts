import { Controller } from '@nestjs/common';
import { IncomeService } from './income.service';
import { Body, Get, Post, Req, UseGuards, Param } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { CreateIncomeDto } from './dtos/create-income.dto';
import { Role } from '../auth/roles/roles.enum';
import { UUID } from 'crypto';

@UseGuards(JwtGuard)
@UseGuards(RolesGuard)
@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Roles(Role.USER)
  @Get('me')
  async myIncomes(@Req() req) {
    return this.incomeService.getIncomesForUser(req.user.id);
  }

  @Roles(Role.USER)
  @Post()
  async create(@Req() req, @Body() dto: CreateIncomeDto) {
    return this.incomeService.createIncome(req.user.id, dto);
  }

  @Get(':id')
  async getOneIncome(@Req() req, @Param('id') incomeId: string) {
    const isAdminUser = req.user.roles.includes('admin');
    return this.incomeService.getIncomeByIdForUser(
      incomeId,
      req.user.id,
      isAdminUser,
    );
  }

  @Roles(Role.ADMIN)
  @Get('user/:userId')
  async getIncomesForUser(@Req() req, @Param('userId') userId: UUID) {
    return this.incomeService.getIncomesForUser(userId);
  }

  @Roles(Role.ADMIN)
  @Get()
  async getAll() {
    return this.incomeService.getAllIncomes();
  }
}
