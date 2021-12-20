import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'User',
  initialState: { user: null, accessToken: null },
  reducers: {
    setCredentials: (state, { payload: { user, accessToken } }) => {
      state.user = user;
      state.accessToken = accessToken;
    },
    logOut: (state, _) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = state => state.auth.user;
