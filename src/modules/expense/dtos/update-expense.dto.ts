import { IsOptional, IsNumber, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { IsDateNotInFuture } from 'src/helper/validators/is-date-not-in-future';

export class UpdateExpenseDto {
  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDateNotInFuture({ message: 'Date cannot be in the future' })
  date?: Date;
}
