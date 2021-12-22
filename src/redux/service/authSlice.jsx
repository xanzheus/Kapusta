import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'User',
  initialState: { user: null, accessToken: null, refreshToken: null },
  reducers: {
    setCredentials: (state, { payload: { user, accessToken, refreshToken } }) => {
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    logOut: (state, _) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = state => state.auth.user;
export const getRefreshToken = state => state.auth.refreshToken;
