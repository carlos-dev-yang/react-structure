import React from 'react';
import { IUserInfo } from './types';
import { ActionMap } from '@utils/ActionMap';

type UserDataReducerProps = Partial<IUserInfo>;

enum UserEventActionTypes {
  NAME,
  ADDRESS,
  AGE,
  PROFILE,
  ALL,
}

type IUserInfoPayload = {
  [UserEventActionTypes.NAME]: string;
  [UserEventActionTypes.ADDRESS]: string;
  [UserEventActionTypes.AGE]: number;
  [UserEventActionTypes.ALL]: UserDataReducerProps;
};

type IUserAction = ActionMap<IUserInfoPayload>[keyof ActionMap<IUserInfoPayload>];

function userDataReducer(state: UserDataReducerProps, action: IUserAction) {
  switch (action.type) {
    case UserEventActionTypes.NAME: {
      return { ...state, name: action.payload };
    }
    case UserEventActionTypes.ADDRESS: {
      return { ...state, address: action.payload };
    }
    case UserEventActionTypes.AGE: {
      return { ...state, age: action.payload };
    }
    case UserEventActionTypes.ALL: {
      return action.payload;
    }
  }
}

const initUserFormReducer: IUserInfo = {
  name: '',
  address: '',
  age: undefined,
};

export function useUserInfoReducer(): any {
  const [userInfoForm, userFormDispatch] = React.useReducer(userDataReducer, initUserFormReducer);

  const handleUserName = (value: string) => {
    userFormDispatch({ type: UserEventActionTypes.NAME, payload: value });
  };
  const handleUserAge = (value: string) => {
    userFormDispatch({ type: UserEventActionTypes.NAME, payload: value });
  };
  const handleUserAddress = (value: string) => {
    userFormDispatch({ type: UserEventActionTypes.NAME, payload: value });
  };

  const handleUserInfoReset = (userInfo: IUserInfo) => {
    userFormDispatch({ type: UserEventActionTypes.ALL, payload: userInfo });
  };

  return {
    userInfoForm,
    handleUserName,
    handleUserAge,
    handleUserAddress,
    handleUserInfoReset,
  };
}
