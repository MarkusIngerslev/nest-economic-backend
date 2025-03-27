import { IsArray, IsEnum } from 'class-validator';
import { Role } from '../../../helper/enum/roles.enum';

export class UpdateRoleDto {
  @IsArray()
  @IsEnum(Role, { each: true })
  roles: Role[];
}
