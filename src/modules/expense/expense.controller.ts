import { Controller } from '@nestjs/common';
import { ExpenseService } from './expense.service';
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
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { UpdateExpenseDto } from './dtos/update-expense.dto';
import { Role } from '../../helper/enum/roles.enum';
import { UUID } from 'crypto';

@UseGuards(JwtGuard, RolesGuard)
@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  /* GET Methods */
  @Roles(Role.ADMIN)
  @Get()
  async getAll() {
    return this.expenseService.getAllExpenses();
  }

  @Roles(Role.USER)
  @Get('me')
  async myExpenses(@Req() req) {
    return this.expenseService.getExpensesForUser(req.user.id);
  }

  @Get(':id')
  async getOneExpense(@Req() req, @Param('id') expenseId: string) {
    const isAdminUser = req.user.roles.includes('admin');
    return this.expenseService.getExpenseByIdForUser(
      expenseId,
      req.user.id,
      isAdminUser,
    );
  }

  @Roles(Role.ADMIN)
  @Get('user/:userId')
  async getExpensesForUser(@Req() req, @Param('userId') userId: UUID) {
    return this.expenseService.getExpensesForUser(userId);
  }

  /* POST Methods */
  @Roles(Role.USER)
  @Post()
  async create(@Req() req, @Body() dto: CreateExpenseDto) {
    return this.expenseService.createExpense(req.user.id, dto);
  }

  /* PATCH Methods */
  @Roles(Role.USER)
  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') expenseId: string,
    @Body() dto: UpdateExpenseDto,
  ) {
    const isAdminUser = req.user.roles.includes('admin');
    return this.expenseService.updateExpense(
      expenseId,
      req.user.id,
      dto,
      isAdminUser,
    );
  }

  /* DELETE Methods */
  @Roles(Role.USER)
  @Delete(':id')
  async delete(@Req() req, @Param('id') expenseId: string) {
    const isAdminUser = req.user.roles.includes('admin');
    await this.expenseService.deleteExpense(
      expenseId,
      req.user.id,
      isAdminUser,
    );
    return { message: 'Expense deleted successfully' };
  }
}
