import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Request } from 'express';

import { UserRole } from '../../user/interfaces/user-role';
import { ROLES_KEY } from '../decorators/auth/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    const request = context.switchToHttp().getRequest<Request>();

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const userRoles = request.user?.roles;

    const hasRole = userRoles.some((userRole) =>
      requiredRoles.includes(userRole),
    );

    if (!hasRole) {
      throw new ForbiddenException('INSUFFICIENT_PERMISSIONS');
    }

    return true;
  }
}
