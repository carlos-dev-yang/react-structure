export interface IUserProps {
  name: string;
  age: number;
  address: string;
  profile: string | null;
}

const profileInfo = 'profile';

export type IUserInfo = Omit<IUserProps, typeof profileInfo>;
export type IUserProfile = Pick<IUserProps, typeof profileInfo>;
