import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/modules/users/users.service';
import { AccessTokenPayload } from '../types/AccessTokenPayload';
import { Role } from '../roles/roles.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: AccessTokenPayload) {
    const user = await this.usersService.findOneById(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      id: payload.userId,
      email: payload.email,
      roles: payload.roles as Role[],
    };
  }
}
