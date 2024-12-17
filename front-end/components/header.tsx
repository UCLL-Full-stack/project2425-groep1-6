import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Language from "./language/Language";

const Header: React.FC = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("loggedInUser");
      if (user) {
        setIsLoggedIn(true);
        setUserName(JSON.parse(user).username);
      } else {
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("loggedInUser");
      sessionStorage.removeItem("token"); // Remove token from session storage
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
            { href: "/", label: "Home" }
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
          {[
            { href: "/movies", label: "Movies" },
            { href: "/tasks", label: "Tasks" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={getLinkClasses(link.href)}
            >
              {link.label}
            </Link>
          ))}            
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
                className={getLinkClasses("/logout")}
              >
                Log Out
              </Link>
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
