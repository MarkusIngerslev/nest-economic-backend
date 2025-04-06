import {
  Controller,
  Get,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../../helper/enum/roles.enum';
import { UserProfileDto } from './dto/user-profile.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async getUsers() {
    return await this.usersService.findAll();
  }

  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.usersService.findById(req.user.id);

    return user;
  }
}
