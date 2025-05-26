import {
  IsNotEmpty,
  IsString,
  IsObject,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer'; // Nødvendig for @Type decorator
import { ChatMessageDto } from './chat-message.dto'; // Importer den nye DTO

export class CreateChatCompletionDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsObject()
  contextData?: any; // Optional context data for more complex interactions

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true }) // Validerer hvert element i arrayet
  @Type(() => ChatMessageDto) // Fortæller class-validator/transformer hvilken type elementerne er
  history?: ChatMessageDto[]; // Array af tidligere beskeder
}
