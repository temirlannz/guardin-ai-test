import {type BodyType, createInstance, type SecondParameter} from "@/shared/api/api-instance.ts";

export interface RegisterDto {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface RegisterResponseDto {
  success: boolean;
  message?: string;
}

export const authControllerRegister = (
  registerDto: BodyType<RegisterDto>,
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<RegisterResponseDto>(
    {
      url: `/api/v1/auth/register`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: registerDto,
    },
    options
  );
};
