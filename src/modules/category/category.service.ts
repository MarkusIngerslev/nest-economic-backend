import {
  ConflictException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Category } from './category.entity';
import { CategoryType } from 'src/helper/enum/category.enum';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { User } from '../user/user.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(name: string, type: CategoryType, userId: string): Promise<Category> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const category = this.categoryRepo.create({ name, type, user });
    return this.categoryRepo.save(category);
  }

  async findAll(userId: string): Promise<Category[]> {
    return this.categoryRepo.find({ where: { user: { id: userId } } });
  }

  async findByType(type: CategoryType, userId: string): Promise<Category[]> {
    return this.categoryRepo.find({ where: { type, user: { id: userId } } });
  }


   async findById(id: string, userId: string, isAdmin: boolean = false): Promise<Category> {
    const findOptions = isAdmin ? { id } : { id, user: { id: userId } };
    const category = await this.categoryRepo.findOne({ where: findOptions });
    if (!category) {
      throw new NotFoundException(
        `Category with ID ${id} not found` + (isAdmin ? '' : ' for this user'),
      );
    }
    return category;
  }

  async findOneByIdAndType(id: string, type: CategoryType, userId: string): Promise<Category> {
    const category = await this.categoryRepo.findOne({
      where: { id, type, user: { id: userId } },
    });

    if (!category) {
      throw new NotFoundException(
        `Category with ID ${id} and type ${type} not found for this user`,
      );
    }

    return category;
  }

  async updateCategory(id: string, dto: UpdateCategoryDto, userId: string, isAdmin: boolean = false): Promise<Category> {
    const category = await this.findById(id, userId, isAdmin); // findById vil kaste fejl hvis brugeren ikke ejer kategorien (medmindre admin)
    Object.assign(category, dto);
    return this.categoryRepo.save(category);
  }

  async deleteCategory(id: string, userId: string, isAdmin: boolean = false): Promise<void> {
    const category = await this.findById(id, userId, isAdmin);
    try {
      await this.categoryRepo.remove(category);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const driverError = error as any; // Type assertion to access driverError

        if (
          driverError.driverError?.code === '23503' || // Typisk for PostgreSQL
          driverError.message?.includes('FOREIGN KEY constraint failed') || // Typisk for SQLite
          driverError.message?.toLowerCase().includes('foreign key constraint') // Mere generelt
        ) {
          throw new ConflictException(
            'Denne kategori kan ikke slettes, da den er i brug i en af enten indtægterne eller udgifterne.',
          );
        }
      }
      // Hvis det er en anden type fejl, kastes den videre
      throw error;
    }
  }
}
