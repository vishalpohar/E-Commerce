import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <div className="flex-1 flex flex-col justify-end">
        <h1 className="text-9xl font-bold text-zinc-400">404</h1>
      </div>

      <div className="bg-zinc-200 w-full flex-1 flex flex-col items-center gap-6 p-6">
        <p className="text-5xl text-zinc-500 font-light text-">
          Sorry, Page Not Found
        </p>
        <p className="text-zinc-500">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link
          to="/"
          className="bg-zinc-400 hover:bg-zinc-500 text-white px-5 py-2 rounded-md">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
