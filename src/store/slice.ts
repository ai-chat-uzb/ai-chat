import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Types } from 'modules/create-account';

interface SliceProps {
  user: Types.IForm.IUser;
  isLogined: boolean;
  isAuthenticated: boolean;
  accessToken: string;
  settingsModal: boolean;
  firstUsernameModal: boolean;
}

const initialState: SliceProps = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
    avatarUrl: '',
    username: '',
    id: NaN
  },
  isLogined: false,
  isAuthenticated: false,
  accessToken: '',
  settingsModal: true,
  firstUsernameModal: false
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
      state.user = {
        firstName: '',
        email: '',
        avatarUrl: '',
        lastName: '',
        username: '',
        id: NaN
      };
      state.isLogined = false;
      state.isAuthenticated = false;
    },
    changeToken(state: SliceProps, { payload }: PayloadAction<{ accessToken: string }>) {
      state.accessToken = payload.accessToken;
    },
    avatarUrlChange(state: SliceProps, { payload }: PayloadAction<{ avatarUrl: Types.IForm.IUser['avatarUrl'] }>) {
      state.user = { ...state.user, avatarUrl: payload.avatarUrl };
    },
    usernameChange(state: SliceProps, { payload }: PayloadAction<{ username: Types.IForm.IUser['username'] }>) {
      state.user = { ...state.user, username: payload.username };
    },
    settingsModalChange(state: SliceProps) {
      state.settingsModal = !state.settingsModal;
    },
    firstUsernameChange(state: SliceProps) {
      state.firstUsernameModal = true;
    }
  }
});

export const {
  loginUser,
  isAuthenticatedChange,
  isReset,
  changeToken,
  avatarUrlChange,
  settingsModalChange,
  firstUsernameChange,
  usernameChange
} = slice.actions;

// Selectors

export const getUser = (store: SliceProps) => store.user;
export const getIsLogined = (store: SliceProps) => store.isLogined;
export const getIsAuthenticated = (store: SliceProps) => store.isAuthenticated;
export const getIsSettingsModal = (store: SliceProps) => store.settingsModal;
export const getIsFirstUsernameHandler = (store: SliceProps) => store.firstUsernameModal;
export const getIsAccessToken = (store: SliceProps) => store.accessToken;

export default slice.reducer;
