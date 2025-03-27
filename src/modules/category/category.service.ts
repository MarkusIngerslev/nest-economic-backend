import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CategoryType } from 'src/enum/category.enum';

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

  async findOneByIdAndType(id: string, type: CategoryType): Promise<Category> {
    const category = await this.categoryRepo.findOne({
      where: { id, type },
    });

    if (!category) {
      throw new NotFoundException('Category not found or type mismatch');
    }

    return category;
  }
}
