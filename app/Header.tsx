import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoutBtn from "./LogoutBtn";

function Header() {
  // Here session will be the value we pull from the NextAuth session object
  const session = true;
  if (session)
    return (
      <header className="sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-md">
        <div className="flex space-x-2">
          <Image
            src="/logo.png"
            alt="Profile Picture"
            height={10}
            width={50}
            className="rounded-full mx-2 object-contain"
          />
          <div>
            <p className="text-blue-400">Logged in as:</p>
            <p className="font-bold text-lg">Valyn D'silva</p>
          </div>
        </div>
        <LogoutBtn />
      </header>
    );
  return (
    <header className="sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-md">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex space-x-2 items-center">
          <Image src="/logo.png" alt="Logo" height={10} width={50} />
          <p className="text-blue-400">Welcome to Meta Messenger</p>
        </div>

        <Link
          href="/auth/signin"
          className="bg-blue-500 hover:gb-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
}

export default Header;
