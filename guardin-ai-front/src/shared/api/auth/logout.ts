import {createInstance, type SecondParameter} from "../api-instance";

export interface LogoutResponseDto {
  success: boolean;
  message: string;
}

export const authControllerLogout = (
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<LogoutResponseDto>(
    {
      url: `/api/v1/auth/logout`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    options
  );
};
