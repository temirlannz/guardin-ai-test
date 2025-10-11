import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Request } from 'express';

import { SessionUser } from '../../interfaces/session-user.interface';

export const Session = createParamDecorator(
  (data: keyof SessionUser, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.session.user;

    if (!user) {
      return null;
    }

    return data ? user[data] : user;
  },
);
