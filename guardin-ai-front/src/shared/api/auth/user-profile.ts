import {createInstance, type SecondParameter} from "@/shared/api/api-instance.ts";

export interface UserSession {
  id: string;
  email: string;
  phone: string;
  roles: string[];
  first_name: string;
  last_name: string;
}

export const authControllerUserProfile = (
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<UserSession>(
    { url: `/api/v1/user/profile`, method: 'GET' },
    options
  );
};
