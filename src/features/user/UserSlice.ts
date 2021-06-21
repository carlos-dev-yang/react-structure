import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

import { IRootState } from '@src/core/store';
import { IUserProps, IUserInfo, IUserProfile } from './types';

const sliceName = 'userSlice';

const initialState: IUserProps = {
  name: 'james',
  address: 'seoul',
  age: 38,
  profile: undefined,
};

// 빈 엔티티 어뎁터를 생성
// 슬라이스를 생성
const userSlice = createSlice({
  name: sliceName,
  initialState, // adapter에 초기값을 세팅한다.
  reducers: {
    // 외부에서 사용할 action을 선언한다.
    setUserInfo(state, action: PayloadAction<IUserInfo>) {
      const { name, address, age } = action.payload;
      state.name = name;
      state.address = address;
      state.age = age;
    },
    setUserProfile(state, action: PayloadAction<IUserProfile>) {
      const { profile } = action.payload;
      state.profile = profile;
    },
    resetUserData(state) {
      state = initialState;
    },
  },
});

const selectAllUser = (state: IRootState): IUserProps => state.userReducer;

const selectUserProfile = ({ profile }: IUserProfile) => {
  return { profile };
};

const selectUserInfo = ({ name, address, age }: IUserInfo) => {
  return { name, address, age };
};

const getUserProfile = createSelector(selectAllUser, selectUserProfile);
const getUserInfo = createSelector(selectAllUser, selectUserInfo);

export const userAction = userSlice.actions; // slice action을 내보낸다.
export const userReducer = userSlice.reducer; // slice reduce를 내보낸다.

export const userSelector = { selectAllUser, getUserProfile, getUserInfo };
