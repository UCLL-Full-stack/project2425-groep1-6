import { useRouter } from "next/router";
import { StatusMessage } from "../../types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import UserService from "@/services/userService";

const UserLoginForm: React.FC = () => {
  const { t } = useTranslation();
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nameError, setNameError] = useState<string | null>("null");
  const [passwordError, setPasswordError] = useState<string | null>("null");
  const [statusmessage, setStatusmessage] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const clearErrors = () => {
    setNameError(null);
    setPasswordError(null);
    setStatusmessage([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!name && name.trim() === "") {
      setNameError(t("login.validate.name"));
      result = false;
    }

    if (!password && password.trim() === "") {
      setPasswordError(t("login.validate.password"));
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
      const response = await UserService.loginUser({
        username: name,
        password,
      });

      if (response.status === 200) {
        const user = await response.json();
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            token: user.token,
            fullname: user.fullname,
            username: user.username,
            role: user.role,
          })
        );

        setStatusmessage([
          {
            message: t("login.success"),
            type: "success",
          },
        ]);

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setStatusmessage([
          {
            message: t("login.error"),
            type: "error",
          },
        ]);
      }
    } catch (error) {
      setStatusmessage([
        {
          message: t("general.error"),
          type: "error",
        },
      ]);
    }
  };

  return (
    <>
      <h3 className="px-0">{t("login.title")}</h3>
    </>
  );
};

export default UserLoginForm;
