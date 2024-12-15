import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Language from "./language/Language";

const Header: React.FC = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedInUserToken = sessionStorage.getItem("loggedInUserToken");
      if (loggedInUserToken === null) {
        setIsLoggedIn(false);
        return;
      }
      const userDetails = JSON.parse(
        sessionStorage.getItem("loggedInUserDetails") || "{}"
      );
      setUserName(userDetails.username || "");
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("loggedInUserToken");
      sessionStorage.removeItem("loggedInUserDetails");
    }
    setIsLoggedIn(false);
    router.push("/");
  };

  const getLinkClasses = (path: string) => {
    return `px-4 text-lg ${
      router.pathname === path
        ? "text-yellow-400 font-bold underline"
        : "text-white"
    } hover:text-yellow-400 hover:shadow-lg active:text-orange-500`;
  };

  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
      <div className="d-flex flex-column align-items-center">
        <span className="fs-2 text-white-50 text-decoration-none mb-2 font-cursive text-shadow">
          Bio-Scope
        </span>
        <nav className="flex items-center">
          {[
            { href: "/", label: "Home" },
            { href: "/movies", label: "Movies" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={getLinkClasses(link.href)}
            >
              {link.label}
            </Link>
          ))}

          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className={getLinkClasses("/dashboard")}>
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 text-lg text-white hover:text-yellow-400 hover:shadow-lg active:text-orange-500 border-none bg-transparent cursor-pointer"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={getLinkClasses("/login")}>
                Login
              </Link>
              <Link href="/register" className={getLinkClasses("/register")}>
                Register
              </Link>
            </>
          )}
          <Language />
        </nav>
      </div>
    </header>
  );
};

export default Header;
