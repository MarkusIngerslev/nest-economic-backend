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
  async getAll(@Req() req: any, @Query('type') type?: CategoryType) {
    const userId = req.user.id; // Hent userId fra req.user
    if (type) {
      return this.categoryService.findByType(type, userId);
    }
    return this.categoryService.findAll(userId);
  }

  @Get(':id')
  async getOne(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id; // Hent userId fra req.user
    const userRoles = req.user.roles || []; // Hent roller fra req.user, antager det er et array
    // Tjek om brugeren er admin for at tillade adgang til alle kategorier
    const isAdmin = userRoles.includes(Role.ADMIN);
    return this.categoryService.findById(id, userId, isAdmin);
  }

  /****************/
  /* POST Methods */
  /****************/

  @Post()
  async create(
    @Body() body: { name: string; type: CategoryType },
    @Req() req: any,
  ) {
    const userId = req.user.id; // Hent userId fra req.user
    return this.categoryService.create(body.name, body.type, userId);
  }

  /****************/
  /* PATCH Method */
  /****************/

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
    @Req() req: any,
  ) {
    const userId = req.user.id; // Hent userId fra req.user
    const userRoles = req.user.roles || []; // Hent roller fra req.user
    const isAdmin = userRoles.includes(Role.ADMIN);
    return this.categoryService.updateCategory(id, dto, userId, isAdmin);
  }

  /*****************/
  /* DELETE Method */
  /*****************/

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id; // Hent userId fra req.user
    const userRoles = req.user.roles || []; // Hent roller fra req.user
    const isAdmin = userRoles.includes(Role.ADMIN);
    await this.categoryService.deleteCategory(id, userId, isAdmin);
    return { message: 'Category deleted successfully' };
  }
}
