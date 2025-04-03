import { useState, FormEvent, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { login } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

interface LoginCredentials {
  personalNumber: string;
  password: string;
}

// const LOGIN_URL = `${API_BASE_URL}/auth/login`;

function Login() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    personalNumber: '',
    password: '',
  });

  const navigate = useNavigate();

  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setError(null);

    try {
      await dispatch(await login(credentials));
      setCredentials({ personalNumber: '', password: '' });
    } catch (err) {
      console.log(err);

      // setError(err instanceof Error ? err.message : 'שגיאה לא ידועה');
    }
  };
  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);
  return (
    <div className="flex min-h-screen min-w-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="max-w-md p-6 bg-white w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">התחברות</h2>

        <div className="mb-4">
          <label htmlFor="username" className="text-gray-700 mb-2 block">
            שם משתמש
          </label>
          <input
            id="username"
            type="text"
            value={credentials.personalNumber}
            onChange={(e) =>
              setCredentials({ ...credentials, personalNumber: e.target.value })
            }
            className="p-2 border-gray-300 rounded focus:ring-blue-500 w-full border focus:ring-2 focus:outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="text-gray-700 mb-2 block">
            סיסמה
          </label>
          <input
            id="password"
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="p-2 border-gray-300 rounded focus:ring-blue-500 w-full border focus:ring-2 focus:outline-none"
            required
          />
        </div>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 w-full transition"
        >
          {loading ? 'loading' : 'התחבר'}
        </button>
      </form>
    </div>
  );
}

export default Login;
