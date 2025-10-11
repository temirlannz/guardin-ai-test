import { UserRole } from '../../user/interfaces/user-role';

export interface SessionUser {
  id: string;
  email: string;
  roles: UserRole[];
  first_name: string;
  last_name: string;
}
