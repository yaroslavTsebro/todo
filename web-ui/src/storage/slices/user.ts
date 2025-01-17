import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string | null;
  email: string | null;
  accessToken: string | null;
}

const initialState: UserState = {
  name: null,
  email: null,
  accessToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ name: string | null; email: string }>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    clearUser(state) {
      state.name = null;
      state.email = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, setAccessToken, clearUser } = userSlice.actions;

export default userSlice.reducer;