import {
  Controller,
  Get,
  Post,
  Param,
  Req,
  Body,
  Query,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryType } from 'src/helper/enum/category.enum';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Role } from 'src/helper/enum/roles.enum';
import { UpdateCategoryDto } from './dto/update-category.dto';

@UseGuards(JwtGuard, RolesGuard)
@Roles(Role.USER)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /***************/
  /* GET Methods */
  /***************/

  @Get()
  async getAll(@Query('type') type?: CategoryType) {
    if (type) {
      return this.categoryService.findByType(type);
    }
    return this.categoryService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.categoryService.findById(id);
  }

  // @Get('search')

  /****************/
  /* POST Methods */
  /****************/

  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() body: { name: string; type: CategoryType }) {
    return this.categoryService.create(body.name, body.type);
  }

  /****************/
  /* PATCH Method */
  /****************/

  @Roles(Role.ADMIN)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(id, dto);
  }

  /*****************/
  /* DELETE Method */
  /*****************/

  @Roles(Role.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.categoryService.deleteCategory(id);
    return { message: 'Category deleted successfully' };
  }
}
