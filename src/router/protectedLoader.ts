// routes/protectedLoader.ts
import { redirect } from 'react-router-dom';

import { CheckAuthResponse, handleCheckAuth } from '../api/auth';

export const protectedLoader = async () => {
  const res: CheckAuthResponse = await handleCheckAuth();
  const success = res.status === 'success';

  if (!success) return redirect('/login');
};
