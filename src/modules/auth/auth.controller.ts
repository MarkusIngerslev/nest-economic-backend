import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
  Put,
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
import { UpdateRoleDTO } from './dtos/update-role.dto';
import { UUID } from 'crypto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
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

  @Put('admin/update-user-roles/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async adminUpdateRole(
    @Param('id') id: UUID,
    @Body() updateRoleBody: UpdateRoleDTO,
  ) {
    return await this.authService.updateRole(id, updateRoleBody);
  }
}
