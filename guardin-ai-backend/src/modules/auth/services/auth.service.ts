import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { compare } from 'bcrypt';
import { Request, Response } from 'express';

import { EnvConfig } from '../../../libs/common/interfaces/env.config';
import { CreateUserDto } from '../../user/dtos/create-user.dto';
import { UserService } from '../../user/services/user.service';

import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { SessionUser } from '../interfaces/session-user.interface';
import { sanitizeUser } from '../../../libs/common/utils/sanitize-user.util';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService<EnvConfig>,
  ) {}

  public async register(dto: RegisterDto) {
    const { first_name, last_name, email, password } = dto;

    const user = await this.userService.findByEmail(email);
    if (user) {
      throw new ConflictException('Пользователь уже существует');
    }

    const newUserDto = {
      first_name,
      last_name,
      email,
      password,
    } satisfies CreateUserDto;

    await this.userService.createUser(newUserDto);

    return {
      message: 'Вы успешно зарегистрировались',
      success: true,
    };
  }

  public async login(req: Request, dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.userService.findByEmailOrThrow(email);

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      throw new ConflictException('Неверная почта или пароль');
    }

    const sessionUser = sanitizeUser(user);
    req.session.user = sessionUser;

    await this.saveSession(req);

    return { success: true };
  }

  public async logout(
    req: Request,
    res: Response,
  ): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve, reject) => {
      req.session.destroy((error) => {
        if (error) {
          this.logger.error(error);

          return reject({
            success: false,
            message: 'Ошибка при завершении сессии',
          });
        } else {
          res.clearCookie(
            this.configService.getOrThrow<string>('SESSION_NAME'),
          );
        }

        resolve({
          success: true,
          message: 'Вы успешно вышли из аккаунта',
        });
      });
    });
  }

  public async saveSession(req: Request) {
    this.logger.debug(
      `Attempting to save session for user: ${JSON.stringify(req.session.user)}`,
    );

    return new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err) {
          this.logger.error(`Session save error: ${err}`);
          reject(new InternalServerErrorException('Failed to save session.'));
        } else {
          this.logger.log('Session saved successfully.');
          resolve(true);
        }
      });
    });
  }
}
