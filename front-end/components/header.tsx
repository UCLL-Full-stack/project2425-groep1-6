import Link from "next/link";
import Language from "./language/Language";

const Header: React.FC = () => {
  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
      <div className="d-flex flex-column align-items-center">
        <a
          className="fs-2 text-white-50 text-decoration-none mb-2"
          style={{ fontFamily: "Cursive", textShadow: "2px 2px 4px #000000" }}
        >
          Bio-Scope
        </a>
        <nav className="nav d-flex align-items-center">
          <Link
            href="/"
            className="nav-link px-4 fs-5 text-white hover:text-yellow-400 hover:text-shadow-lg active:text-orange-500"
            style={{ textShadow: "1px 1px 2px #000000" }}
          >
            Home
          </Link>
          <Link
            href="/movies"
            className="nav-link px-4 fs-5 text-white hover:text-yellow-400 hover:text-shadow-lg active:text-orange-500"
            style={{ textShadow: "1px 1px 2px #000000" }}
          >
            Movies
          </Link>
          <Link
            href="/login"
            className="nav-link px-4 fs-5 text-white hover:text-yellow-400 hover:text-shadow-lg active:text-orange-500"
            style={{ textShadow: "1px 1px 2px #000000" }}
          >
            Login
          </Link>
          <Link
            href="/register"
            className="nav-link px-4 fs-5 text-white hover:text-yellow-400 hover:text-shadow-lg active:text-orange-500"
            style={{ textShadow: "1px 1px 2px #000000" }}
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
