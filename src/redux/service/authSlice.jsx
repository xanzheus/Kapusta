import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, accessToken: null },
  reducers: {
    setCredentials: (state, { payload: { user, accessToken } }) => {
      console.log(accessToken);
      console.log(state);
      state.user = user;
      state.accessToken = accessToken;
    },
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = state => state.auth.user;
