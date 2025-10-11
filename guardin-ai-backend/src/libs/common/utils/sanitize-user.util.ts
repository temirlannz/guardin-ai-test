import { SessionUser } from '../../../modules/auth/interfaces/session-user.interface';
import { User } from '../../../../generated/prisma';

export function sanitizeUser(user: User): SessionUser {
  return {
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    roles: user.roles,
  };
}
