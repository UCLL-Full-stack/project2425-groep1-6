import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Header from "@/components/header";
import UserLoginForm from "@/components/user/UserLoginForm";
import Head from "next/head";
import { useTranslation } from 'next-i18next';
import UsersOverview from "@/components/UsersOverview";
import { useEffect, useState } from "react";
import { User } from "@/types";
import UserService from "@/services/userService";

const Login: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("app.title")}</title>
        <meta name="description" content="Login" />
      </Head>
      <Header />
      <main>
        <UserLoginForm />
        <UsersOverview/>
      </main>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Login;
