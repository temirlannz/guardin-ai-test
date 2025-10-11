import { Module } from '@nestjs/common';
import { DatabaseModule } from './libs/infrastructure/database/database.module';
import { CoreConfigModule } from './libs/infrastructure/config/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [CoreConfigModule, DatabaseModule, AuthModule, UserModule],
})
export class AppModule {}
