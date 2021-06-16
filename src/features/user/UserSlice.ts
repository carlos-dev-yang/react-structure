import React from 'react';
import { createSlice, PayloadAction, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

import { IRootState } from '@src/core/store';
import { IUserProps } from './types';

const sliceName = 'userSlice';

const initialState: IUserProps = {
  name: 'james',
  address: 'seoul',
  age: 38,
  profile: null,
};

// 빈 엔티티 어뎁터를 생성
// 슬라이스를 생성
const userSlice = createSlice({
  name: sliceName,
  initialState, // adapter에 초기값을 세팅한다.
  reducers: {
    // 외부에서 사용할 action을 선언한다.
    setUserInfo(state, action: PayloadAction<Omit<IUserProps, 'profile'>>) {
      const { name, address, age } = action.payload;
      state.name = name;
      state.address = address;
      state.age = age;
    },
    setUserProfile(state, action: PayloadAction<Pick<IUserProps, 'profile'>>) {
      const { profile } = action.payload;
      state.profile = profile;
    },
  },
});

const userDataSelector = (state: IRootState) => state.userReducer;

const selectUserProfile = (userReducer: IUserProps) => userReducer.profile;

const selectUserInfo = (userReducer: IUserProps) => {
  const { name, address, age } = userReducer;
  return { name, address, age };
};

const getUserProfile = createSelector(userDataSelector, selectUserProfile);

export const userAction = userSlice.actions; // slice action을 내보낸다.
export const userReducer = userSlice.reducer; // slice reduce를 내보낸다.

export const userSelector = { selectUserProfile, selectUserInfo };
