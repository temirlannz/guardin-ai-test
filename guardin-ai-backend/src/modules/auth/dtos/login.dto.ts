import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Введите корректный адрес электронной почты' })
  @IsNotEmpty({ message: 'Поле email не должно быть пустым' })
  email: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Поле пароль не должно быть пустым' })
  password: string;
}
