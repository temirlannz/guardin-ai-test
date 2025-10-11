import 'express-session';
import { SessionUser } from './modules/auth/interfaces/session-user.interface';

declare module 'express-session' {
  interface SessionData {
    user?: SessionUser;
  }
}
