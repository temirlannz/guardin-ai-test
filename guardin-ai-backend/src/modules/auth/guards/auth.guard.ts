import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';

import { UserService } from '../../user/services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly userService: UserService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    if (typeof request.session.user === 'undefined') {
      throw new UnauthorizedException('Пользователь не авторизован');
    }

    const user = await this.userService.findByIdOrThrow(
      request.session.user.id,
    );

    request.user = user;

    return true;
  }
}
