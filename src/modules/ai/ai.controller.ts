import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { CreateChatCompletionDto } from './dto/create-chat-completion.dto';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'src/helper/enum/roles.enum';

@UseGuards(JwtGuard, RolesGuard) // Beskytter routen, juster efter behov
@Roles(Role.USER) // Angiver roller, der har adgang til denne controller
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('completions')
  async craeteCompletion(@Body() createAiDto: CreateChatCompletionDto) {
    const gptResponse = await this.aiService.getChatCompletion(
      createAiDto.message,
    );

    // Formatere svaret fra OpenAI SDK
    if (
      gptResponse.choices &&
      gptResponse.choices.length > 0 &&
      gptResponse.choices[0].message
    ) {
      return {
        reply: gptResponse.choices[0].message.content,
        fullResponse: gptResponse,
      };
    }
    return {
      reply: 'No response content received from AI.',
      fullResponse: gptResponse, // For debugging
    };
  }
}
