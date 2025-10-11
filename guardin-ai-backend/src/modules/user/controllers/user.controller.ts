import { Controller, Get } from '@nestjs/common';

import { UserService } from '../services/user.service';
import { Authorization } from '../../auth/decorators/auth/auth.decorator';
import { UserRoleEnum } from '../interfaces/user-role';
import { Session } from '../../auth/decorators/auth/session.decorator';

@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Authorization(UserRoleEnum.USER)
  @Get('/profile')
  public async getProfile(@Session('id') user_id: string) {
    return await this.userService.getProfile(user_id);
  }
}
