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

  @Expose()
  phone?: string;

  @Expose()
  address?: string;

  @Expose()
  birthDate?: Date;

  @Expose()
  profilePictureUrl?: string;

  @Expose()
  city?: string;

  @Expose()
  postalCode?: string;

  @Expose()
  country?: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
