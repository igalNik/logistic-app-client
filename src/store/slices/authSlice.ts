import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleLogin } from '../../api/auth';
import { User } from './../../types/User';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean | null;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Async thunk for login
export const login = createAsyncThunk<
  { token: string; data: User }, // clearly defined return type (LoginResponse)
  { personalNumber: string; password: string }
>(
  'auth/login',
  async (credentials: { personalNumber: string; password: string }) => {
    try {
      const res = await handleLogin(
        credentials.personalNumber,
        credentials.password
      );
      return res;
    } catch (error: any) {
      return error;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state: AuthState, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      document.cookie =
        'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ token: string; data: User }>) => {
          state.loading = false;
          state.user = action.payload.data;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
