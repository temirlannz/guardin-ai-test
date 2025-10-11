import * as process from 'node:process';

import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV,
    }),
  ],
  exports: [ConfigModule],
})
export class CoreConfigModule {}
