import { SessionUser } from './modules/auth/interfaces/session-user.interface';

declare module 'express' {
  export interface Request {
    user?: SessionUser;
  }
}
