import Header from "@/components/header";
import UserRegistrationForm from "@/components/user/UserRegistrationForm";
import Head from "next/head";

const Register: React.FC = () => {
  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register" />
      </Head>
      <Header />
      <main>
        <h1 className="flex justify-center text-4xl pt-5">Register</h1>
        <UserRegistrationForm></UserRegistrationForm>
      </main>
    </>
  );
};
