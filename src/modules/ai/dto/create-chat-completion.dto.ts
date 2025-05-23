import { IsNotEmpty, IsString } from "class-validator";

export class CreateChatCompletionDto {
  @IsNotEmpty()
  @IsString()
  message: string;
}