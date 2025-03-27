import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryType } from 'src/enum/category.enum';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Role } from 'src/enum/roles.enum';

@UseGuards(JwtGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() body: { name: string; type: CategoryType }) {
    return this.categoryService.create(body.name, body.type);
  }

  @Get()
  async getAll(@Query('type') type?: CategoryType) {
    if (type) {
      return this.categoryService.findByType(type);
    }
    return this.categoryService.findAll();
  }
}
