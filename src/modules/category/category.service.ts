import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CategoryType } from 'src/helper/enum/category.enum';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async create(name: string, type: CategoryType): Promise<Category> {
    const category = this.categoryRepo.create({ name, type });
    return this.categoryRepo.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepo.find();
  }

  async findByType(type: CategoryType): Promise<Category[]> {
    return this.categoryRepo.find({ where: { type } });
  }

  async findById(id: string): Promise<Category> {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async findOneByIdAndType(id: string, type: CategoryType): Promise<Category> {
    const category = await this.categoryRepo.findOne({
      where: { id, type },
    });

    if (!category) {
      throw new NotFoundException('Category not found or type mismatch');
    }

    return category;
  }

  async updateCategory(id: string, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findById(id);
    Object.assign(category, dto);
    return this.categoryRepo.save(category);
  }

  async deleteCategory(id: string): Promise<void> {
    const category = await this.findById(id);
    await this.categoryRepo.remove(category);
  }
}
