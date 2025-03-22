import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthGuard } from '@nestjs/passport';
import { RegisterRequestDTO } from './dtos/register-request.dto';
import { LoginResponseDTO } from './dtos/login-response.dto';
import { RegisterResponseDTO } from './dtos/register-response.dto';
import { Public } from './decorators/public.decorator';
import { JwtGuard } from './guard/jwt.guard';
import { RolesGuard } from './guard/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from './roles/roles.enum';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req): Promise<LoginResponseDTO | BadRequestException> {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  async register(
    @Body() registerBody: RegisterRequestDTO,
  ): Promise<RegisterResponseDTO | BadRequestException> {
    return await this.authService.register(registerBody);
  }

  @Post('admin/create-user')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async adminRegisterUSer(@Body() registerBody: RegisterRequestDTO) {
    return await this.authService.register(registerBody);
  }
}
