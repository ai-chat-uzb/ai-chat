import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Types } from 'modules/create-account';
import { Types as TypesUserSettingsModal } from 'modules/user-settings-modal';

interface SliceProps {
  user: Types.IEntity.IUser;
  isLogined: boolean;
  isAuthenticated: boolean;
  accessToken: string;
  refreshToken: string;
  settingsModal: boolean;
  firstUsernameModal: boolean;
}

const initialState: SliceProps = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
    photoUrl: '',
    username: '',
    id: NaN,
    password: ''
  },
  isLogined: false,
  isAuthenticated: false,
  accessToken: '',
  refreshToken: '',
  settingsModal: false,
  firstUsernameModal: false
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state: SliceProps, { payload }: PayloadAction<{ user: Types.IEntity.IUser }>) {
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
        photoUrl: '',
        lastName: '',
        username: '',
        id: NaN,
        password: ''
      };
      state.accessToken = '';
      state.refreshToken = '';
      state.isLogined = false;
      state.isAuthenticated = false;
    },
    changeToken(state: SliceProps, { payload }: PayloadAction<{ accessToken: string; refreshToken?: string }>) {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken || state.refreshToken;
    },
    photoUrlChange(state: SliceProps, { payload }: PayloadAction<{ photoUrl: Types.IEntity.IUser['photoUrl'] }>) {
      state.user = { ...state.user, photoUrl: payload.photoUrl };
    },
    usernameChange(state: SliceProps, { payload }: PayloadAction<TypesUserSettingsModal.IEntity.UserSettingsModal>) {
      state.user = { ...state.user, username: payload.username, photoUrl: payload.photoUrl };
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
  photoUrlChange,
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
export const getIsRefreshToken = (store: SliceProps) => store.refreshToken;

export default slice.reducer;
