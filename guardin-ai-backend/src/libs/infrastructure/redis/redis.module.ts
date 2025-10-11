import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import Redis from 'ioredis';

import { EnvConfig } from '../../common/interfaces/env.config';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: (config: ConfigService<EnvConfig>) => {
        const redis = new Redis(config.getOrThrow<string>('REDIS_URL'));
        redis.on('error', (err) => console.error('Redis error:', err));
        return redis;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
