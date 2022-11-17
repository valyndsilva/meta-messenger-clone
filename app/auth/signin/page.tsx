import React from "react";
import { getProviders } from "next-auth/react";
import Image from "next/image";
import SignInComponent from "./SignInComponent";

async function SignIn() {
  const providers = await getProviders();
  return (
    <div>
      <div className="flex justify-center">
        <Image
          className="rounded-full mx-2 object-cover"
          width={700}
          height={700}
          src="/meta-logo.png"
          alt="Profile Picture"
        />
      </div>
      <SignInComponent providers={providers} />
    </div>
  );
}

export default SignIn;
