import { Controller, Post, Body, UseGuards, Logger } from '@nestjs/common';
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
  private readonly logger = new Logger(AiController.name); // Logger for bedre debugging

  constructor(private readonly aiService: AiService) {}

  @Post('completion')
  async craeteCompletion(@Body() createAiDto: CreateChatCompletionDto) {
    const { message, history } = createAiDto; // Udpak også history
    this.logger.log(
      `Enpoint /ai/completion kaldt med besked: "${message}"${history ? ` og ${history.length} historikbeskeder.` : '.'}`,
    );

    const gptResponse = await this.aiService.getChatCompletion(
      message,
      history, // Send historikken med
    );

    // Formatere svaret med OpenAI SDK
    if (gptResponse?.choices?.[0]?.message?.content) {
      return {
        reply: gptResponse.choices[0].message.content,
      };
    }
    return {
      reply: 'No response content received from AI.',
      fullResponse: gptResponse, // For debugging
    };
  }

  @Post('contextual-completion')
  async createCompletionWithContext(
    @Body() createAiDto: CreateChatCompletionDto,
  ) {
    const { message, contextData, history } = createAiDto;
    this.logger.log(
      `Endpoint /ai/contextual-completion kaldt med besked: "${message}"${contextData ? ' og contextData' : ''}${history ? ` og ${history.length} historikbeskeder.` : '.'}`,
    );

    const gptResponse = await this.aiService.getChatCompletionWithContext(
      message,
      contextData,
      history,
    );

    if (gptResponse?.choices?.[0]?.message?.content) {
      return {
        reply: gptResponse.choices[0].message.content,
      };
    }
    return {
      reply: 'No response content received from AI.',
      fullResponse: gptResponse, // For debugging
    };
  }
}
