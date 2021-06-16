import React from 'react';
import { useUserData } from '@hooks/useUserData';
import { IUserInfo } from './types';
import { Button } from '@components/button';

export function UserInfo(): React.ReactElement {
  const { userInfo, setUserInfo } = useUserData();

  const handleUserInfo = () => {
    const changeUserInfo: IUserInfo = {
      name: 'mike',
      age: 33,
      address: 'gangnam',
    };
    setUserInfo(changeUserInfo);
  };

  return (
    <div>
      <span>{userInfo}</span>
      <div>
        <Button onClick={handleUserInfo}>저장</Button>
      </div>
    </div>
  );
}
