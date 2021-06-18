import React from 'react';
import { Button } from '@components/button';
import { Input } from '@components/input';
import { useUserData } from '@hooks/useUserData';
import { useUserInfoReducer } from './useUserInfoReducer';

export function UserInfo(): React.ReactElement {
  const { userInfo, setUserInfo } = useUserData();

  const {
    userInfoForm,
    handleUserName,
    handleUserAge,
    handleUserAddress,
    handleUserDataReset,
  } = useUserInfoReducer();

  const { name, address, age } = userInfoForm;

  React.useEffect(() => {
    handleOriginalData();
  }, [userInfo]);

  const handleOriginalData = React.useCallback(() => {
    handleUserDataReset(userInfo);
  }, [userInfo]);

  const handleInfoSave = () => {
    setUserInfo(userInfo);
  };

  const nameId = 'userInfoName';
  const addressId = 'userInfoAddress';
  const ageId = 'userInfoAge';

  return (
    <div>
      <div>
        <div>
          <label htmlFor={nameId}>이름</label>
          <Input id={nameId} value={name} onChange={handleUserName} />
        </div>
        <div>
          <label htmlFor={addressId}>주소</label>
          <Input id={addressId} value={address} onChange={handleUserAddress} />
        </div>
        <div>
          <label htmlFor={ageId}>나이</label>
          <Input id={ageId} value={age} onChange={handleUserAge} />
        </div>
      </div>
      <div>
        <Button onClick={handleInfoSave}>저장</Button>
        <Button onClick={handleOriginalData}>초기화</Button>
      </div>
    </div>
  );
}
