import React from 'react';
import { useUserData } from '@hooks/useUserData';
import { IUserProfile } from './types';
import { Button } from '@components/button';

export function UserProfile(): React.ReactElement {
  const { userProfile, setUserProfile } = useUserData();

  const handleUserProfile = () => {
    const changeUserProfile: IUserProfile = {
      profile: 'src',
    };
    setUserProfile(changeUserProfile);
  };

  return (
    <div>
      <span>{userProfile}</span>
      <Button onClick={handleUserProfile}>프로필 저장</Button>
    </div>
  );
}
