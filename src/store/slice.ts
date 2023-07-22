import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Types } from 'modules/create-account';

interface SliceProps {
  user: Types.IForm.IUser | null;
  isLogined: boolean;
  isAuthenticated: boolean;
}

const initialState: SliceProps = {
  user: null,
  isLogined: false,
  isAuthenticated: false
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state: SliceProps, { payload }: PayloadAction<{ user: Types.IForm.IUser }>) {
      state.user = payload.user;
    },
    isAuthenticated(state: SliceProps) {
      state.isLogined = true;
      state.isAuthenticated = true;
    },
    isReset(state: SliceProps) {
      state.user = null;
      state.isLogined = false;
      state.isAuthenticated = false;
    }
    // changeToken(auth: SliceProps, { payload }: PayloadAction<IForm.ICreateAccount['accessToken']>) {
    //   auth.accessToken = payload || '';
    // }
  }
});

export const { loginUser, isAuthenticated, isReset } = slice.actions;

// Selectors

export const getUser = (store: SliceProps) => store.user;
export const getIsLogined = (store: SliceProps) => store.isLogined;
export const getIsAuthenticated = (store: SliceProps) => store.isAuthenticated;

export default slice.reducer;
