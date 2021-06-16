import { IUserProps, userAction, userSelector } from '@features/user';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

type ISetUserInfoProps = Omit<IUserProps, 'profile'>;
type ISetUserProfileProps = Pick<IUserProps, 'profile'>;

export function useUserData() {
  const userProfile = useSelector(userSelector.selectUserProfile);
  const userInfo = useSelector(userSelector.selectUserInfo);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log('login');
  }, [dispatch]);

  const setUserInfo = (userData: ISetUserInfoProps) => {
    dispatch(userAction.setUserInfo(userData));
  };
  const setUserProfile = (userData: ISetUserProfileProps) => {
    dispatch(userAction.setUserProfile(userData));
  };

  return { userProfile, userInfo, setUserInfo, setUserProfile };
}
