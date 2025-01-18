import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string | null;
  email: string | null;
  accessToken: string | null;
}

const loadFromLocalStorage = (): UserState => {
  const userData = localStorage.getItem('user');
  return userData
    ? JSON.parse(userData)
    : { name: null, email: null, accessToken: null };
};

const initialState: UserState = loadFromLocalStorage();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ name: string | null; email: string }>) {
      state.name = action.payload.name;
      state.email = action.payload.email;

      localStorage.setItem('user', JSON.stringify(state));
    },
    clearUser(state) {
      state.name = null;
      state.email = null;
      state.accessToken = null;

      localStorage.removeItem('user');
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
