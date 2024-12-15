import Link from "next/link";
import Language from "./language/Language";

const Header: React.FC = () => {
  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
      <div className="d-flex flex-column align-items-center">
        <a className="fs-2 text-white-50 text-decoration-none mb-2 font-cursive text-shadow">
          Bio-Scope
        </a>
        <nav className="flex items-center">
          <Link
            href="/"
            className="px-4 text-lg text-white hover:text-yellow-400 hover:shadow-lg active:text-orange-500"
          >
            Home
          </Link>
          <Link
            href="/movies"
            className="px-4 text-lg text-white hover:text-yellow-400 hover:shadow-lg active:text-orange-500"
          >
            Movies
          </Link>
          <Link
            href="/login"
            className="px-4 text-lg text-white hover:text-yellow-400 hover:shadow-lg active:text-orange-500"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 text-lg text-white hover:text-yellow-400 hover:shadow-lg active:text-orange-500"
          >
            Register
          </Link>
          <Language />
        </nav>
      </div>
    </header>
  );
};

export default Header;
