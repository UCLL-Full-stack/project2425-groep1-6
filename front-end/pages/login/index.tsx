import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Header from "@/components/header";
import UserLoginForm from "@/components/user/UserLoginForm";
import Head from "next/head";

const Login: React.FC = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login" />
      </Head>
      <Header />
      <main>
        <UserLoginForm />
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
