import UserAuthWidget from '@/features/auth/components/UserAuthWidget';
import { Link } from 'react-router';

export default function Nav() {
  return (
    <header className="navbar bg-green-600 shadow-sm px-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          УГЛТУ
        </Link>
      </div>
      <div className="flex-none gap-4 mr-4">
        <UserAuthWidget />
      </div>
    </header>
  );
}
