import { UUID } from 'crypto';
import { Exclude, Expose } from 'class-transformer';

import { Role } from 'src/helper/enum/roles.enum';

export class UserProfileDto {
  @Expose()
  id: string | UUID;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Exclude()
  password: string;

  @Expose()
  roles: Role[];

  // Add other properties as needed
  // For example:
  // address: string;
  // createdAt: Date;
  // updatedAt: Date;
  // phoneNumber: string;
}
