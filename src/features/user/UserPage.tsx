import React from 'react';
import { UserInfo } from './UserInfo';
import { UserProfile } from './UserProfile';

export function UserPage() {
  return (
    <div>
      <UserProfile />
      <UserInfo />
    </div>
  );
}
