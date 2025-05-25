import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI, { APIError } from 'openai';

@Injectable()
export class AiService {
  private readonly openai: OpenAI; // OpenAI klient instans
  private readonly logger = new Logger(AiService.name); // Logger for bedre debugging
  // private readonly openaiApiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private readonly configService: ConfigService) {
    const apiKeyFromConfig = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKeyFromConfig) {
      this.logger.error(
        'OPENAI_API_KEY er ikke konfigureret eller er tom i .env-filen.',
      );
      throw new Error(
        'OPENAI_API_KEY er ikke konfigureret eller er tom i .env-filen. Sørg venligst for, at den er sat.',
      );
    }

    // Initialiser OpenAI klienten med API-nøglen
    this.openai = new OpenAI({
      apiKey: apiKeyFromConfig,
    });
  }

  async getChatCompletion(message: string): Promise<any> {
    try {
      this.logger.log(`Modtager simpel besked: "${message}"`);
      const chatCompletion = await this.openai.chat.completions.create({
        model: 'gpt-4', // Her kan modellen ændre til den ønskede
        messages: [
          {
            role: 'system',
            content:
              'Du er en hjælpsom assistent som kan mange forskellige ting, men er særlig god til økonomi og økonomiske råd.',
          },
          { role: 'user', content: message },
        ],
        temperature: 0.4, // Juster temperature for at styre kreativiteten mellem 0 og 1
        max_tokens: 500, // Juster max_tokens efter behov
      });

      // SDK'en returnerer allerede den parsede data, så .data er ikke nødvendig som med axios
      return chatCompletion;
    } catch (error) {
      this.handleError(error, 'getChatCompletion');
    }
  }

  async getChatCompletionWithContext(
    message: string,
    contextData?: any,
  ): Promise<any> {
    try {
      this.logger.log(
        `Modtager besked med kontekst: "${message}", Data: ${JSON.stringify(contextData)}`,
      );
      const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        { role: 'system', content: 'Du er en personlig budgetrådgiver.' }, // Specifik systembesked
      ];

      if (contextData) {
        const dataString = JSON.stringify(contextData, null, 2);
        messages.push({
          role: 'system',
          content: `Her er relevant økonomisk data for brugeren, som du kan bruge i dit svar:\n${dataString}`,
        });
      }

      messages.push({ role: 'user', content: message });

      const chatCompletion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: messages,
        temperature: 0.4,
        max_tokens: 1000, // Overvej om max_tokens skal være højere med kontekst
      });
      return chatCompletion;
    } catch (error) {
      this.handleError(error, 'getChatCompletionWithContext');
    }
  }

  private handleError(error: any, methodName: string) {
    if (error instanceof APIError) {
      this.logger.error(
        `OpenAI API Error in ${methodName}: ${error.status} ${error.name} ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to get response from OpenAI: ${error.message}`,
      );
    }
    this.logger.error(
      `Unknown error in ${methodName} communicating with OpenAI:`,
      error,
    );
    throw new InternalServerErrorException(
      'An unexpected error occurred while communicating with OpenAI.',
    );
  }
}
