import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Types } from 'modules/create-account';

interface SliceProps {
  user: Types.IForm.IUser | null;
  isLogined: boolean;
  isAuthenticated: boolean;
  accessToken: string;
}

const initialState: SliceProps = {
  user: null,
  isLogined: false,
  isAuthenticated: false,
  accessToken: ''
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state: SliceProps, { payload }: PayloadAction<{ user: Types.IForm.IUser }>) {
      state.user = payload.user;
    },
    isAuthenticatedChange(state: SliceProps) {
      state.isLogined = true;
      state.isAuthenticated = true;
    },
    isReset(state: SliceProps) {
      state.user = null;
      state.isLogined = false;
      state.isAuthenticated = false;
    },
    changeToken(state: SliceProps, { payload }: PayloadAction<{ accessToken: string }>) {
      state.accessToken = payload.accessToken;
    }
  }
});

export const { loginUser, isAuthenticatedChange, isReset, changeToken } = slice.actions;

// Selectors

export const getUser = (store: SliceProps) => store.user;
export const getIsLogined = (store: SliceProps) => store.isLogined;
export const getIsAuthenticated = (store: SliceProps) => store.isAuthenticated;

export default slice.reducer;
