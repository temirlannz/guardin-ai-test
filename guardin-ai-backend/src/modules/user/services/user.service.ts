import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRoleEnum } from '../interfaces/user-role';
import { DatabaseService } from '../../../libs/infrastructure/database/database.service';
import { sanitizeUser } from '../../../libs/common/utils/sanitize-user.util';

@Injectable()
export class UserService {
  constructor(private readonly database: DatabaseService) {}

  public async getProfile(user_id: string) {
    const user = await this.findByIdOrThrow(user_id);

    return user;
  }

  public async findById(id: string) {
    const user = await this.database.user.findUnique({
      where: { id },
    });

    return user;
  }


  public async findByIdOrThrow(id: string) {
    const user = await this.database.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`Пользователь с id ${id} не найден`);
    }

    return sanitizeUser(user);
  }


  public async findByEmail(email: string) {
    const user = await this.database.user.findUnique({
      where: { email },
    });

    return user;
  }

  public async findByEmailOrThrow(email: string) {
    const user = await this.database.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  public async createUser(dto: CreateUserDto) {
    const { first_name, last_name, email, password, roles } = dto;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return this.database.user.create({
      data: {
        first_name,
        last_name,
        email,
        password: hashedPassword,
        roles: roles ?? [UserRoleEnum.USER],
      },
    });
  }
}
