import { useNavigate } from 'react-router-dom';

const CustomErrorScreen = () => {
  const navigate = useNavigate();
  const handleRefresh = () => navigate('/login');

  return (
    <div className="bg-gray-50 p-4 flex min-h-screen items-center justify-center">
      <div className="max-w-md bg-white shadow-xl rounded-2xl p-8 w-full text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Something went wrong, but we're working to fix it.
        </p>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};
export default CustomErrorScreen;
