import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="flex min-h-full flex-col items-center justify-center">
      <img
        src="public\illustrations\crashed-error.svg"
        alt="Page Not Found"
        className="max-w-md mb-8 w-full"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;
