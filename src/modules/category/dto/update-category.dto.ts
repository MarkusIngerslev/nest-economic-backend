import { IsOptional, IsEnum, IsString } from 'class-validator';
import { CategoryType } from 'src/helper/enum/category.enum';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(CategoryType)
  type?: CategoryType;
}
