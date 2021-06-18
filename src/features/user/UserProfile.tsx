import React from 'react';
import { useUserData } from '@hooks/useUserData';
import { Button } from '@components/button';
import { Input } from '@components/input';
import { useUserProfileReducer } from './useUserProfileReducer';

export function UserProfile(): React.ReactElement {
  const { userProfile, setUserProfile } = useUserData();

  const { userProfileForm, handleUserProfile, handleUserProfileReset } = useUserProfileReducer();

  const { profile } = userProfileForm;

  React.useEffect(() => {
    handleOriginalData();
  }, [userProfile]);

  const handleOriginalData = React.useCallback(() => {
    handleUserProfileReset(userProfile);
  }, [userProfile]);

  const handleInfoSave = () => {
    setUserProfile(userProfile);
  };

  const profileId = 'userProfile';

  return (
    <div>
      <div>
        <div>
          <label htmlFor={profileId}>프로필</label>
          <Input id={profileId} value={profile} onChange={handleUserProfile} />
        </div>
      </div>
      <div>
        <Button onClick={handleInfoSave}>저장</Button>
        <Button onClick={handleOriginalData}>초기화</Button>
      </div>
    </div>
  );
}
