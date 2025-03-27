import { IsOptional, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { IsDateNotInFuture } from 'src/validators/is-date-not-in-future';

export class CreateExpenseDto {
  @IsNumber()
  amount: number;

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDateNotInFuture({ message: 'Date cannot be in the future' })
  date?: Date;
}
