import Link from "next/link";
import { useEffect, useState } from "react";
import Language from "./language/Language";
import { useTranslation } from "next-i18next";
import { User } from '../types';

const Header: React.FC = () => {

  const [loggedInUser, setLoggedInUser] = useState<User>(null!);
  const { t } = useTranslation(); 

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("loggedInUser")!);
    setLoggedInUser(token);
  }, []);

  const handleClick = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null!);
  };

  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
      <a className="flex mb-2 md:mb-5 text-white-50 text-3xl text-gray-300">
        {t('app.title')}
      </a>
      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
        {' '}
        Bio-Scope
      </a>
      <nav className="nav justify-content-center">
        <Link href="/" className="nav-link px-4 fs-5 text-white">
        {t('header.nav.home')}
        </Link>
        <Link href="/movies" className="nav-link px-4 fs-5 text-white">
          Movies
        </Link>

        {!loggedInUser && (
          <Link
            href="/login"
            className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
          >
            {t('header.nav.login')}
          </Link>
        )}
        {loggedInUser && (
          <a
            href="/login"
            onClick={handleClick}
            className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
          >
            {t('header.nav.logout')}
          </a>
        )}
        {loggedInUser && (
          <div className="text-white ms-5 mt-2 md:mt-0 pt-1 md:pt-0 grow">
            {t('header.welcome')}, {loggedInUser.username}!
          </div>
        )}
        <Language/>
      </nav>
    </header>
  );
};  

export default Header;
