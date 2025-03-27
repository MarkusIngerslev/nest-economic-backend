import { IsArray, IsEnum } from 'class-validator';
import { Role } from '../../../enum/roles.enum';

export class UpdateRoleDto {
  @IsArray()
  @IsEnum(Role, { each: true })
  roles: Role[];
}
