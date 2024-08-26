import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Fitness Tracker</h1>
        <nav className="flex justify-end">
          {session ? (
            <>
              <span className="text-gray-700 mr-4">
                Welcome, {session.user.name}
              </span>
              <Link href="/dashboard" className="text-blue-500 hover:text-blue-700 mr-4">
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-blue-500 hover:text-blue-700 mr-4">
                Sign In
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;