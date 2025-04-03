// routes/protectedLoader.ts
import { redirect } from 'react-router-dom';
import { RootState, store } from './../store/store';
import { setUser } from './../store/slices/authSlice';
import { CheckAuthResponse, handleCheckAuth } from '../api/auth';

export const protectedLoader = async () => {
  try {
    const state: RootState = store.getState();

    if (state.auth.user) {
      return;
    }

    const res: CheckAuthResponse = await handleCheckAuth();

    const user: User = res.data;
    store.dispatch(setUser(user));
  } catch {
    return redirect('/login');
  }
};
