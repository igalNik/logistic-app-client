// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import solderReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: solderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
