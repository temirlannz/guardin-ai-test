export interface EnvConfig {
  NODE_ENV: string;

  APP_HOST: string;
  APP_PORT: number;

  ALLOWED_ORIGIN: string;

  FRONTEND_HOST: string;

  COOKIE_SECRET: string;
  SESSION_SECRET: string;
  SESSION_NAME: string;
  SESSION_DOMAIN: string;
  SESSION_MAX_AGE: number;
  SESSION_HTTP_ONLY: boolean;
  SESSION_SECURE: boolean;
  SESSION_FOLDER: string;
  SESSION_SAME_SITE: 'lax' | 'strict' | 'none';

  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_DB: string;
  POSTGRES_URL: string;

  REDIS_PASSWORD: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_URL: string;
}
