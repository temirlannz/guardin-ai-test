import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRoleEnum } from '../interfaces/user-role';

export class CreateUserDto {
  @IsString({ message: 'Имя обязательно должно быть строкой' })
  @IsNotEmpty({ message: 'Имя не может быть пустым' })
  first_name: string;

  @IsString({ message: 'Фамилия обязательно должна быть строкой' })
  @IsNotEmpty({ message: 'Фамилия не может быть пустой' })
  last_name: string;

  @IsEmail({}, { message: 'Некорректный формат email' })
  @IsNotEmpty({ message: 'Email не может быть пустым' })
  email: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Пароль обязателен' })
  @MinLength(8, { message: 'Пароль должен содержать минимум 8 символов' })
  password: string;

  @IsOptional()
  @IsEnum(UserRoleEnum, {
    each: true,
    message: `Роль должна быть одной из: ${Object.values(UserRoleEnum).join(', ')}`,
  })
  roles?: (keyof typeof UserRoleEnum)[];
}
