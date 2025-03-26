import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.entity';
import { AccessToken } from './types/AccessToken';
import { UsersService } from '../users/users.service';
import { RegisterRequestDTO } from './dtos/register-request.dto';
import { UpdateRoleDTO } from './dtos/update-role.dto';
import { Role } from './roles/roles.enum';
import { UUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user: User | null = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }

  async login(user: User): Promise<AccessToken> {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(user: RegisterRequestDTO): Promise<AccessToken> {
    const existingUser = await this.usersService.findOneByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('email already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const roles =
      Array.isArray(user.roles) && user.roles.length > 0
        ? user.roles
        : [Role.USER];

    const newUser = this.usersService.create({
      ...user,
      password: hashedPassword,
      roles,
    });

    await this.usersService.save(newUser);
    return this.login(newUser);
  }

  async updateRole(id: UUID, updateRoleDTO: UpdateRoleDTO): Promise<User> {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    user.roles = updateRoleDTO.roles;
    await this.usersService.update(id, user);
    return user;
  }
}
