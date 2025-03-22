import { UUID } from 'crypto';
import { Role } from '../roles/roles.enum';

export type AccessTokenPayload = {
  userId: UUID;
  email: string;
  roles: Role[];
};
