import { Controller } from '@nestjs/common';
import { IncomeService } from './income.service';
import {
  Body,
  Get,
  Patch,
  Delete,
  Post,
  Req,
  UseGuards,
  Param,
} from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { CreateIncomeDto } from './dtos/create-income.dto';
import { UpdateIncomeDto } from './dtos/update-income.dto';
import { Role } from '../auth/roles/roles.enum';
import { UUID } from 'crypto';

@UseGuards(JwtGuard)
@UseGuards(RolesGuard)
@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  /* GET Methods */
  @Roles(Role.ADMIN)
  @Get()
  async getAll() {
    return this.incomeService.getAllIncomes();
  }

  @Roles(Role.USER)
  @Get('me')
  async myIncomes(@Req() req) {
    return this.incomeService.getIncomesForUser(req.user.id);
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

  /* POST Methods */
  @Roles(Role.USER)
  @Post()
  async create(@Req() req, @Body() dto: CreateIncomeDto) {
    return this.incomeService.createIncome(req.user.id, dto);
  }

  /* PATCH Methods */
  @Roles(Role.USER)
  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') incomeId: string,
    @Body() dto: UpdateIncomeDto,
  ) {
    const isAdminUser = req.user.roles.includes('admin');
    return this.incomeService.updateIncome(
      incomeId,
      req.user.id,
      dto,
      isAdminUser,
    );
  }

  /* DELETE Methods */
  @Roles(Role.USER)
  @Delete(':id')
  async delete(@Req() req, @Param('id') incomeId: string) {
    const isAdminUser = req.user.roles.includes('admin');
    await this.incomeService.deleteIncome(incomeId, req.user.id, isAdminUser);
    return { message: 'Income deleted successfully' };
  }
}
