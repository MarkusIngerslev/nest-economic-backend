import { UUID } from 'crypto';
import { Role } from '../roles/roles.enum';

export type AccessTokenPayload = {
  id: UUID;
  email: string;
  roles: Role[];
};
