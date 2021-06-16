import React from 'react';
import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit';

import { IRootState } from '@src/core/store';
import { IUserProps } from './User.types';

const sliceName = 'userSlice';

// 빈 엔티티 어뎁터를 생성
const userAdapter = createEntityAdapter<IUserProps>();

// 슬라이스를 생성
const userSlice = createSlice({
  name: sliceName,
  initialState: userAdapter.getInitialState(), // adapter에 초기값을 세팅한다.
  reducers: {
    // 외부에서 사용할 action을 선언한다.
    addUserOne: userAdapter.addOne,
    addUserAll(state, action: PayloadAction<IUserProps[]>) {
      userAdapter.removeAll(state);
      userAdapter.addMany(state, action);
    },
    updateUserOne: userAdapter.updateOne,
    updateUserMany: userAdapter.updateMany,
  },
});

const userAdapterSelector = userAdapter.getSelectors(); // getSelectors를 통해 adapter를 호출한다.

const selectAlluser = (state: IRootState) => {
  return userAdapterSelector.selectAll(state.userReducer);
};

const selectUserById = (state: IRootState) => {
  return userAdapterSelector.selectIds(state.userReducer);
};

const selectUserProfile = (state: IRootState, userId: string) => {
  return userAdapterSelector.selectById(state.userReducer, userId);
};

export const userAction = userSlice.actions; // slice action을 내보낸다.
export const userReducer = userSlice.reducer; // slice reduce를 내보낸다.

export const userSelector = { selectAlluser, selectUserById, selectUserProfile };
