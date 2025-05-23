import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class AiService {
  private readonly openaiApiKey: string;
  private readonly openaiApiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const apiKeyFromConfig = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKeyFromConfig) {
      throw new Error(
        'OPENAI_API_KEY er ikke konfigureret eller er tom i .env-filen. Sørg venligst for, at den er sat.',
      );
    }
    this.openaiApiKey = apiKeyFromConfig; // Hent API-nøglen fra konfigurationen
  }

  async getChatCompletion(message: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          this.openaiApiUrl,
          {
            model: 'gpt-3.5-turbo', // Her kan modellen ændres til den ønskede
            messages: [{ role: 'user', content: message }],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.openaiApiKey}`,
            },
          },
        ),
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Error response from OpenAI:', error.response?.data);
        throw new InternalServerErrorException(
          'Failed to get response from OpenAI: ' +
            (error.response?.data?.error?.message || error.message),
        );
      }
      console.error('Unknown error communicating with OpenAI:', error);
      throw new InternalServerErrorException(
        'An unexpected error occurred while communicating with OpenAI.',
      );
    }
  }
}
