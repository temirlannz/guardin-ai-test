import { $Enums } from '../../../../generated/prisma';

export type UserRole = $Enums.UserRole;

export const UserRoleEnum = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const satisfies Record<string, UserRole>;
