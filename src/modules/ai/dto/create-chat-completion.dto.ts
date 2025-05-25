import { IsNotEmpty, IsString, IsObject, IsOptional } from 'class-validator';

export class CreateChatCompletionDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsObject()
  contextData?: any; // Optional context data for more complex interactions
}
