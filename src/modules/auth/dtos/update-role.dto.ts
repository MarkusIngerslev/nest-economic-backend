import { IsArray, IsEnum } from 'class-validator';
import { Role } from '../roles/roles.enum';

export class UpdateRoleDTO {
  @IsArray()
  @IsEnum(Role, { each: true })
  roles: Role[];
}
