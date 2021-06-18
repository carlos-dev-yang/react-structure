import React from 'react';
import { IUserProfile, IUserProps } from './types';
import { ActionMap } from '@utils/ActionMap';

enum UserActionTypes {
  PROFILE,
  ALL,
}

type IUserProfilePayload = {
  [UserActionTypes.PROFILE]: string | undefined;
  [UserActionTypes.ALL]: IUserProfile;
};

type IUserAction = ActionMap<IUserProfilePayload>[keyof ActionMap<IUserProfilePayload>];

function userDataReducer(state: IUserProfile, action: IUserAction) {
  switch (action.type) {
    case UserActionTypes.PROFILE: {
      return { ...state, profile: action.payload };
    }
    case UserActionTypes.ALL: {
      return { ...action.payload };
    }
  }
}

const initUserProfile: IUserProfile = {
  profile: '',
};

export function useUserProfileReducer() {
  const [userProfileForm, userFormDispatch] = React.useReducer(userDataReducer, initUserProfile);

  const handleUserProfile = (profile: string) => {
    userFormDispatch({ type: UserActionTypes.PROFILE, payload: profile });
  };

  const handleUserProfileReset = (userProfile: IUserProfile) => {
    userFormDispatch({ type: UserActionTypes.ALL, payload: userProfile });
  };

  return {
    userProfileForm,
    handleUserProfile,
    handleUserProfileReset,
  };
}
