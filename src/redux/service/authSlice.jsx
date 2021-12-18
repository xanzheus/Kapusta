import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, accessToken: null },
  reducers: {
    setCredentials: (state, { payload: { user, accessToken } }) => {
      console.log('slice', accessToken);
      // if (state.user && state.accessToken) {
      state.user = user;
      state.accessToken = accessToken;
      // }
      //
      // state.accessToken = accessToken;
    },
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = state => state.auth.user;
