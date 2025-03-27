import { UUID } from 'crypto';
import { Role } from '../../../enum/roles.enum';

export type AccessTokenPayload = {
  id: UUID;
  email: string;
  roles: Role[];
};
