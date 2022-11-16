# Meta Messenger Clone:

## Create a new project installing [Tailwind CSS with NextJS](https://v2.tailwindcss.com/docs/guides/nextjs)

```
npx create-next-app -e with-tailwindcss meta-messenger-clone
cd meta-messenger-clone
git init
git remote add origin https://github.com/valyndsilva/meta-messenger-clone.git
git branch -M main
git push -u origin main
```

In NextJS 12 by default anything in pages folder is a client component.
In NextJS 13 everything in the "new" app directory is a server component.

## Enable the "app" directory:

Update next.config.js:

```
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
};
```

## Enable tailwind.config.js to include the app directory:

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

```

## Create the app directory in the root and it's contents inside:

Delete index.tsx from pages directory. Next, in the root create /app/pages.tsx:

```
import React from "react";

function Home() {
  return <div>Home</div>;
}

export default Home;

```

Restart server:

```
npm run dev
```

In the app directory a head.tsx and layout.tsx gets created automatically.

In head.tsx:
Update title as needed.

```
export default function Head() {
  return (
    <>
      <title>Meta Messenger Clone</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
    </>
  )
}
```

In layout.tsx:
Move the tailwind css line:

```
import "../styles/globals.css";
```

from pages/\_app.tsx into layout.tsx and delete pages/\_app.tsx.
Anything in the page.tsx is rendered into the children below.

```
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>{children}</body>
    </html>
  );
}

```

Test if tailwind CSS is working properly.. In app/page.tsx:

```
import React from "react";

function Home() {
  return (
    <main>
      <h1 className="text-red-500">Welcome to Meta Messenger</h1>
    </main>
  );
}

export default Home;

```

## Building Header:

In app/layout.tsx:

```
import "../styles/globals.css";
import Header from "./Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}

```

In app/Header.tsx:

```
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

```

## Create a LogoutBtn.tsx in app directory:

This component will be used as a Client component since we use a click handler in it:

```
"use client";

import React from "react";

function LogoutBtn() {
  return (
    <button
      className="bg-blue-500 hover:gb-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => console.log("Sign out")}
    >
      Sign Out
    </button>
  );
}

export default LogoutBtn;

```

## Create the Message List and Chat Input Component:

Create app/MessageList.tsx and app/ChatInput.tsx.

Update the app/page.tsx:

```
import React from "react";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

function Home() {
  return (
    <main>
      {/* Message List */}
      <MessageList />
      {/* Chat Input */}
      <ChatInput />
    </main>
  );
}

export default Home;

```

In app/MessageList.tsx:

```
import React from "react";

function MessageList() {
  return (
    <div>
      <p>Message 1</p>
      <p>Message 2</p>
      <p>Message 3</p>
      <p>Message 4</p>
      <p>Message 5</p>
      <p>Message 6</p>
    </div>
  );
}

export default MessageList;

```

In app/ChatInput.tsx:
To get the type definition for an event addMessage ex:onSubmit={addMessage} use the onSubmit={(e)=>addMessage} and hover over e to copy the type definition.

```
"use client";

import React, { FormEvent, useState } from "react";

function ChatInput() {
  const [input, setInput] = useState("");
  const addMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    const messageToSend = input; //copy of input state
    setInput(""); //clears input state
  };
  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-300"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter message here..."
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent  px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;

```

## Setting up Upstash:

Upstash basically holds a Redis database and let's you connect to it easily. You get to create 1 free project on Upstash. Avoid using socket connections to a serverless function. They should be stateless and not have connections. Rest APIs are ideal for Lamdas, Vercel functions etc.

- Go to https://console.upstash.com/
- Login and click on "Create database".
- Enter Name: meta-messenger-clone
- Select a Region > EU_WEST_1(ireland) > Create database
- Click on the database you just created "meta-messenger-clone"
- Select "Details" tab.
- Connect to youyr database: Node

```
npm install ioredis
```

Create a redis.ts file in the root directory of your application. It will use a Singleton pattern.
Create a .env.local file in the root directory:

```
REDIS_URL=....
```

Copy the example url from "Connect your database" section. It looks something like this:

```
"redis://:********@eu1-proven-goose-38597.upstash.io:38597"
```

Copy your Password from the "Details" tab and replace the \***\*\*\*\*** with it in the URL above and paste this URL as the value of REDIS_URL in .env.local.

In redis.ts:

```
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

export default redis;
```

## Implementing UUID Library:

https://www.npmjs.com/package/uuid

```
npm install uuid
npm i --save-dev @types/uuid
```

Create a typings.d.ts file in the root:

```
export interface Message {
  id: string;
  message: string;
  created_at: number;
  username: string;
  profilePic: string;
  email: string;
}
```

Update the app/ChatInput.tsx:

```
"use client";

import React, { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";

function ChatInput() {
  const [input, setInput] = useState("");
  const addMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    const messageToSend = input; //copy of input state
    setInput(""); //clears input state

    const id = uuid();
    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: "Test",
      profilePic: "https://randomuser.me/api/portraits/women/50.jpg",
      email: "test@test.com",
    };

    const uploadMessageToUpstash = async () => {
      const res = await fetch("/api/addMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
        }),
      });
      const data = await res.json();
      console.log("Messaged Added:", data);
    };
    uploadMessageToUpstash();
  };
  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-300"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter message here..."
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent  px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;

```

Next, create an api endpoint for addMessage:
In pages/api/addMessage.tsx

```
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";
import { Message } from "../../typings";

type Data = {
  message: Message;
};

interface ErrorData {
  body: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== "POST") {
    res.status(405).json({
      body: "You are trying to make a GET request to a POST request endpoint. Method Not Allowed!",
    });
    return;
  }
  const { message } = req.body;
  const newMessage = {
    ...message,
    // Replace the timestamp of the user to the timestamp of the server
    created_at: Date.now(),
  };

  // push to upstash redis db
  await redis.hset("messages", message.id, JSON.stringify(newMessage));

  res.status(200).json({ message: newMessage });
}

```
