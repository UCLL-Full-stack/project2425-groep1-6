import { Role } from "@/types";
import { useRouter } from "next/router";
import { StatusMessage } from "../../types";
import { useState } from "react";
import UserService from "@/services/userService";
import classNames from "classnames";

const UserRegistrationForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const clearErrors = () => {
    setUsernameError(null);
    setPasswordError(null);
    setEmailError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!username || username.trim() === "") {
      setUsernameError("Username is required");
      result = false;
    }

    if (!password || password.trim() === "") {
      setPasswordError("Password is required");
      result = false;
    }

    if (!email || email.trim() === "") {
      setEmailError("Email is required");
      result = false;
    }

    return result;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    clearErrors();

    if (!validate()) {
      return;
    }

    try {
      const response = await UserService.registerUser({
        username,
        password,
        email,
        role: role as Role,
      });

      if (response.status === 200) {
        setStatusMessages([
          {
            message: "Registration successful. Redirecting to login page...",
            type: "success",
          },
        ]);

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setStatusMessages([
          {
            message: "An error has occurred. Please try again later.",
            type: "error",
          },
        ]);
      }
    } catch (error) {
      setStatusMessages([
        {
          message: "An error has occurred. Please try again later.",
          type: "error",
        },
      ]);
    }
  };

  return (
    <>
      <h3 className="px-0">Register</h3>
      {statusMessages && (
        <div className="row">
          <ul className="list-none mb-3 mx-auto ">
            {statusMessages.map(({ message, type }, index) => (
              <li
                key={index}
                className={classNames({
                  "text-red-800": type === "error",
                  "text-green-800": type === "success",
                })}
              >
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="usernameInput"
          className="block mb-2 text-sm font-medium"
        >
          Username:
        </label>
        <div className="block mb-2 text-sm font-medium">
          <input
            id="usernameInput"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {usernameError && (
            <div className="text-red-800 ">{usernameError}</div>
          )}
        </div>
        <label
          htmlFor="passwordInput"
          className="block mb-2 text-sm font-medium"
        >
          Password:
        </label>
        <div className="block mb-2 text-sm font-medium">
          <input
            id="passwordInput"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {passwordError && (
            <div className="text-red-800 ">{passwordError}</div>
          )}
        </div>
        <label htmlFor="emailInput" className="block mb-2 text-sm font-medium">
          Email:
        </label>
        <div className="block mb-2 text-sm font-medium">
          <input
            id="emailInput"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          {emailError && <div className="text-red-800 ">{emailError}</div>}
        </div>
        <label htmlFor="roleInput" className="block mb-2 text-sm font-medium">
          Role:
        </label>
        <div className="block mb-2 text-sm font-medium">
          <select
            id="roleInput"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="guest">Guest</option>
            <option value="worker">Worker</option>
          </select>
        </div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="submit"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default UserRegistrationForm;
