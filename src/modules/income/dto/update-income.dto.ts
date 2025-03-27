import { IsOptional, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { IsDateNotInFuture } from 'src/validators/is-date-not-in-future';

export class UpdateIncomeDto {
  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDateNotInFuture({ message: 'Date cannot be in the future' })
  date?: Date;
}
