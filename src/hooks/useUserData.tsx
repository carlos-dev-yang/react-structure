import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUserInfo, IUserProfile, IUserProps, userAction, userSelector } from '@features/user';

export function useUserData() {
  const userProfile = useSelector(userSelector.getUserProfile);
  const userInfo = useSelector(userSelector.getUserInfo);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log('login');
  }, [dispatch]);

  const setUserInfo = (userInfo: IUserInfo) => dispatch(userAction.setUserInfo(userInfo));

  const setUserProfile = (userProfile: IUserProfile) =>
    dispatch(userAction.setUserProfile(userProfile));

  const setUserReset = () => {
    dispatch(userAction.resetUserData());
  };

  return {
    userProfile,
    userInfo,
    setUserInfo,
    setUserProfile,
    setUserReset,
  };
}
