export interface IUserProps {
  name: string;
  age: number | undefined;
  address: string;
  profile: string | undefined;
}

const profileInfo = 'profile';

export type IUserInfo = Omit<IUserProps, typeof profileInfo>;
export type IUserProfile = Pick<IUserProps, typeof profileInfo>;
