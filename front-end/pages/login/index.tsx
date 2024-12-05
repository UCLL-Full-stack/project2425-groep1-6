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
        <h1 className="flex justify-center text-4xl pt-5">Login</h1>
        <UserLoginForm></UserLoginForm>
      </main>
    </>
  );
};

export default Login;
