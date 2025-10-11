import {type BodyType, createInstance, type SecondParameter} from "@/shared/api/api-instance.ts";


export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  success: boolean;
}

export const authControllerLogin = (
  loginDto: BodyType<LoginDto>,
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<LoginResponseDto>(
    {
      url: `/api/v1/auth/login`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: loginDto,
    },
    options
  );
};
