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
      className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-300  bg-white"
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
      className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-300  bg-white"
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

Test by adding a message in the UI input. You should be able to see the data added in Upstash Redis db under "Data Browser" tab.

## Implementing [SWR](https://swr.vercel.app/): (Stale While Revalidate):

[Docs](https://swr.vercel.app/docs/getting-started)
SWR is a HTTP cache invalidation strategy to first return the data from cache (stale), then send the fetch request (revalidate), and finally come with the up-to-date data.

```
npm install swr
```

### Fetching Data from the Redis db in Upstash with SWR:

With SWR if you send a request from ChatInput component it caches the data value returned. If the MessageList component needs the same data value it goes into the cache and gets the data value out instead of making a new request to the Redis db.

#### Create a API endpoint pages/api/getMessages.tsx:

We make a fetch call to the Redis db. Since we access the HASH in the db we use the hvals to get messages inside it by passing the keys.

In pages/api/getMessages.tsx:

```
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";
import { Message } from "../../typings";

type Data = {
  message: Message[];
};

interface ErrorData {
  body: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== "GET") {
    res.status(405).json({
      body: "You are trying to make a POST request to a GET request endpoint. Method Not Allowed!",
    });
    return;
  }

  const messagesRes = await redis.hvals("messages"); // returns a JSON stringified value
  // Parse the stringified value back into an object and sort by created_at
  const messages: Message[] = messagesRes
    .map((message) => JSON.parse(message))
    .sort((a, b) => b.created_at - a.created_at);

  res.status(200).json({ messages });
}

```

#### Create a fetcher function:

In the root directory create utils/fetchMessages.tsx:

```
import { Message } from "../typings";

const fetcher = async () => {
  const res = await fetch("/api/getMessages");
  const data = await res.json();
  const messages: Message[] = data.messages;
  return messages;
};

export default fetcher;
```

#### Update ChatInput.tsx to use SWR for data fetching:

We fetch the data using the fetcher function and store it in the cache. The key for accessing it is "/api/getMessages"

```
"use client";

import React, { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import useSWR from "swr";
import fetcher from "../utils/fetchMessages";

function ChatInput() {
  const [input, setInput] = useState("");

  // Using SWR for data fetching (GET request)
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);
  console.log(messages);

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
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
      return [data.message, ...messages!];
    };
    // uploadMessageToUpstash();
    // await mutate(uploadMessageToUpstash); // slight delay in updating the data
    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    }); // optimistic update instant update
  };
  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-300  bg-white"
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

#### Update app/MessageList.tsx to use SWR for data fetching:

```
"use client";
import React from "react";
import useSWR from "swr";
import { Message } from "../typings";
import fetcher from "../utils/fetchMessages";

function MessageList() {
  // Using SWR for data fetching (GET request)
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetcher);
  // console.log(messages);

  return (
    <div>
      {messages?.map((message) => (
        <div key={message.id}>
          <p>{message.message}</p>
        </div>
      ))}
    </div>
  );
}

export default MessageList;

```

#### Create MessageComponent.tsx and Update MessageList.tsx:

In MessageList.tsx:

```
"use client";
import React from "react";
import useSWR from "swr";
import { Message } from "../typings";
import fetcher from "../utils/fetchMessages";
import MessageComponent from "./MessageComponent";

function MessageList() {
  // Using SWR for data fetching (GET request)
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetcher);
  // console.log(messages);

  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {messages?.map((message) => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  );
}

export default MessageList;

```

In MessageComponent.tsx:

```
import Image from "next/image";
import React from "react";
import { Message } from "../typings";

interface Props {
  key: string;
  message: Message;
}
function MessageComponent({ message }: Props) {
  return (
    <div className="flex items-center  w-fit">
      <div className="flex-shrink-0">
        <Image
          className="rounded-full mx-2"
          height={10}
          width={50}
          src={message.profilePic}
          alt="Profile Picture"
        />
      </div>
      <div>
        <p className="text-[0.65rem] px-[2px] pb-[2px] text-red-400">
          {message.username}
        </p>
        <div className="flex items-end">
          <div className="px-3 py-2 rounded-lg w-fit text-white bg-red-400">
            <p>{message.message}</p>
          </div>
          <p className="text-[0.65rem] px-2 italic text-gray-300">
            {new Date(message.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MessageComponent;

```

#### Change Style of MessageComponent if isUser exists:

In MessageComponent.tsx:

```
import Image from "next/image";
import React from "react";
import { Message } from "../typings";

interface Props {
  key: string;
  message: Message;
}
function MessageComponent({ message }: Props) {
  const isUser = true;

  return (
    <div className={`flex items-center  w-fit ${isUser && "ml-auto"}`}>
      <div className={`flex-shrink-0  ${isUser && "order-2"}`}>
        <Image
          className="rounded-full mx-2"
          height={10}
          width={50}
          src={message.profilePic}
          alt="Profile Picture"
        />
      </div>
      <div>
        <p
          className={`text-[0.65rem] px-[2px] pb-[2px] ${
            isUser ? "text-blue-400 text-right" : "text-red-400 text-left"
          }`}
        >
          {message.username}
        </p>
        <div className="flex items-end">
          <div
            className={`px-3 py-2 rounded-lg w-fit text-white bg-red-400 ${
              isUser ? "bg-blue-400 ml-auto order-2" : "bg-red-400"
            }`}
          >
            <p>{message.message}</p>
          </div>
          <p
            className={`text-[0.65rem] px-2 italic text-gray-300  ${
              isUser && "text-right"
            }`}
          >
            {new Date(message.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MessageComponent;

```

### Implementing [Pusher](https://pusher.com/):

Pusher helps update on the fly with a realtime connection. It avoids interval and re-fetching delays which causes unnecsessary pinging of the server. It uses a pub-sub model.
Ex: All clients can subscribe to listen to a topic. Everytime someone sends a message on the backend API. When there is a new message, pusher pushes a message to the messages chat saying new message. All subscribers gets an update and adds the new message to the cache.
Pusher uses useSWR() to efficiently and optimistically render the upate.

- Sign up to pusher.
- Go to [Dashboard](https://dashboard.pusher.com/)
- Create Channels app.
- Name your app: meta-messenger
- Select a cluster: eu(EU Ireland)
- Front end: React
- Back end: Node.js
- Create App

Click on App Keys and copy the appId, key, secret, cluster and add it into the .env.local:

```
PUSHER_APP_ID=...
PUSHER_KEY=...
PUSHER_SECRET=...
PUSHER_CLUSTER=...
```

Install dependencies:

```
npm install pusher pusher-js
```

Here, pusher-js is the front-end and pusher is the backend.

#### Create a pusher.ts in the root:

It uses Singleton patter like redis.ts. Click on "Getting Started" for reference.

In pusher.ts:

```
import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export const clientPusher = new ClientPusher("591a7752fe0dac421398", {
  cluster: "eu",
  forceTLS: true,
});

```

If you use environment variables in the clientPusher it does not work.

Next click on the "Debug Console" in Pusher.

#### Update pages/api/addMessage.tsx:

Use serverPusher to trigger an API message event in Pusher - Debug Console tab when a new message is sent.

```
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { serverPusher } from "../../pusher";
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

  // Triggers API message in Pusher - Debug Console tab
  serverPusher.trigger("messages", "new-message", newMessage);

  res.status(200).json({ message: newMessage });
}

```

#### ERROR: Module not found: Can't resolve 'encoding' in '/Users/vmd/Documents/Local Sites/meta-messenger-clone/node_modules/node-fetch/lib'

```
npm install encoding
```

#### Update app/MessageList.tsx:

```
"use client";
import React, { useEffect } from "react";
import useSWR from "swr";
import { clientPusher } from "../pusher";
import { Message } from "../typings";
import fetcher from "../utils/fetchMessages";
import MessageComponent from "./MessageComponent";

function MessageList() {
  // Using SWR for data fetching (GET request)
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetcher);
  // console.log(messages);

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");

    // listen for a message
    channel.bind("new-message", async (data: Message) => {
      // console.log("Messages:", messages);
      // If you sent the message, no need to update the cache
      if (messages?.find((message) => message.id === data.id)) return; // Check if the id of message is already in our messages don't update as you pushed the message

      if (!messages) {
        mutate(fetcher);
      } else {
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        });
      }
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, mutate, clientPusher]);

  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {messages?.map((message) => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  );
}

export default MessageList;

```

## Implementing SSR with NextJS 13:

When you are on a server component you cannot use relative URLs. Instead we use environment variables.
In .env.local add:

```
VERCEL_URL=http://localhost:3000
```

In app/page.tsx:

```
import React from "react";
import { Message } from "../typings";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

async function Home() {
  // SSR on server:
  // const res = await fetch(`${process.env.VERCEL_URL || "http://localhost:3000"}/api/getMessages`).then((res)=>res.json());
  const res = await fetch(`${process.env.VERCEL_URL || "http://localhost:3000"}/api/getMessages`);
  const data = await res.json(); // pre-fetches data from server
  // console.log(data);

  const messages:Message[]=data.messages;

  return (
    <main>
      {/* Message List */}
      <MessageList initialMessages={messages}/>
      {/* Chat Input */}
      <ChatInput />
    </main>
  );
}

export default Home;

```

Update MessageList.tsx:

```
"use client";
import React, { useEffect } from "react";
import useSWR from "swr";
import { clientPusher } from "../pusher";
import { Message } from "../typings";
import fetcher from "../utils/fetchMessages";
import MessageComponent from "./MessageComponent";

interface Props {
  initialMessages: Message[];
}

function MessageList({ initialMessages }: Props) {
  // Using SWR for data fetching (GET request)
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetcher);
  // console.log(messages);

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");

    // listen for a message
    channel.bind("new-message", async (data: Message) => {
      // console.log("Messages:", messages);
      // If you sent the message, no need to update the cache
      if (messages?.find((message) => message.id === data.id)) return; // Check if the id of message is already in our messages don't update as you pushed the message

      if (!messages) {
        mutate(fetcher);
      } else {
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        });
      }
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, mutate, clientPusher]);

  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {(messages || initialMessages).map((message) => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  );
}

export default MessageList;

```

## Implementing Loading Functionality:

In app/loading.tsx:
[Flowbite spinners](https://flowbite.com/docs/components/spinner/) Alignment middle spinner

```
import React from "react";

function Loading() {
  return (
    <div className="text-center pt-8">
      <p className="text-blue-400 pb-5 animate-pulse">Loading Messenger...</p>
      <div role="status">
        <svg
          className="inline mr-2 w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
```

## Implementing [NextAuth Authentication](https://next-auth.js.org/getting-started/example) with Facebook:

### Install NextAuth:

```
npm install next-auth
```

### Create a Facebook App for Authentication:

Login to your Facebook account.
Go to https://developers.facebook.com/
My Apps
Create an App
Type: Consumer
App Name:messenger-clone
App Contact Email:...
Create App
Select: Facebook Login > Setup > WWW > Site URL: www.example.com > Continue > Next > Next > Next
Click on Settings > Basic
Copy the APP ID and APP SECRET and paste it in the .env.local file

### Create a NEXTAUTH_SECRET:

Generate a secret in the terminal and paste it in .env.local file.

```
openssl rand -base64 32
```

### Update .env.local:

```
FACEBOOK_CLIENT_ID=...
FACEBOOK_CLIENT_SECRET=...
NEXTAUTH_SECRET=...
```

### Add API Route:

Create In pages/api/auth/[...nextauth].ts:

```
import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  secret:process.env.NEXTAUTH_SECRET!,
  pages:{
    signIn:'/auth/signin',
  }
};

export default NextAuth(authOptions);

```

## Implementing Sign In Functionality:

### Create in app/auth/signin/page.tsx

```
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
```

### Create app/auth/signin/head.tsx:

```
import React from "react";

function Head() {
  return <title>Sign in to Messenger</title>;
}

export default Head;

```

### Create app/auth/signin/SignInComponent.tsx:

This will be a client-side component.

```
"use client";

import React from "react";
import { getProviders, signIn } from "next-auth/react";

interface Props {
  providers: Awaited<ReturnType<typeof getProviders>>;
}

function SignInComponent({ providers }: Props) {
  return (
    <div className="flex justify-center">
      {Object.values(providers!).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: process.env.VERCEL_URL || "https://localhost:3000",
              })
            }
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default SignInComponent;

```

### Getting the Session:

#### Approach 1: Get Session in a Client Side component using Provider:

##### Create in app/providers.tsx:

```
'use client';
import { SessionProvider } from "next-auth/react";

export function Providers({ session, children }: any) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

```

##### Use Providers in app/page.tsx:

```
import React from "react";
import { Message } from "../typings";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import { Providers } from "./providers";
import { unstable_getServerSession } from "next-auth/next";

async function Home() {
  // SSR on server:
  // const res = await fetch(`${process.env.VERCEL_URL || "http://localhost:3000"}/api/getMessages`).then((res)=>res.json());
  const res = await fetch(
    `${process.env.VERCEL_URL || "http://localhost:3000"}/api/getMessages`
  );
  const data = await res.json(); // pre-fetches data from server
  // console.log(data);

  const messages: Message[] = data.messages;

  const session = await unstable_getServerSession();

  return (
    <Providers session={session}>
      <main>
        <MessageList initialMessages={messages} />
        <ChatInput session={session} />
      </main>
    </Providers>
  );
}

export default Home;

```

##### Update ChatInput.tsx:

Disable input when there is no session and update message.

```
"use client";

import React, { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import useSWR from "swr";
import fetcher from "../utils/fetchMessages";
import { unstable_getServerSession } from "next-auth/next";

interface Props {
  session: Awaited<ReturnType<typeof unstable_getServerSession>>;
}
function ChatInput({ session }: Props) {
  const [input, setInput] = useState("");

  // Using SWR for data fetching (GET request)
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);
  // console.log(messages);

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input || !session) return;

    const messageToSend = input; //copy of input state
    setInput(""); //clears input state

    const id = uuid();
    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: session?.user?.name!,
      profilePic: session?.user?.image!,
      email: session?.user?.email!,
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
      // console.log("Messaged Added:", data);
      return [data.message, ...messages!];
    };
    // uploadMessageToUpstash();
    // await mutate(uploadMessageToUpstash); // slight delay in updating the data
    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    }); // optimistic update instant update
  };
  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-300 bg-white"
    >
      <input
        type="text"
        value={input}
        disabled={!session}
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

##### In app/LogoutBtn.tsx:

```
"use client";
import React from "react";
import { signOut } from "next-auth/react";

function LogoutBtn() {
  return (
    <button
      className="bg-blue-500 hover:gb-blue-700 text-white font-bold py-2 px-4 rounded"
      // onClick={() => console.log("Sign out")}
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}

export default LogoutBtn;

```

##### In app/Header.tsx:

```
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoutBtn from "./LogoutBtn";
import { unstable_getServerSession } from "next-auth/next";

async function Header() {
  // Here session will be the value we pull from the NextAuth session object
  // const session = true;
  const session = await unstable_getServerSession();
  if (session)
    return (
      <header className="sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-md">
        <div className="flex space-x-2">
          <Image
            // src="/logo.png"
            src={session.user?.image!}
            alt="Profile Picture"
            height={50}
            width={50}
            className="rounded-full mx-2 object-contain"
          />
          <div>
            <p className="text-blue-400">Logged in as:</p>
            <p className="font-bold text-lg">{session.user?.name}</p>
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

##### Update next.config.js:

```
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["randomuser.me", "platform-lookaside.fbsbx.com"],
  },
  experimental: {
    appDir: true,
  },
};

```

##### Install React TimeAgo:

```
npm install react-timeago
npm i --save-dev @types/react-timeago
```

##### In MessageComponent.tsx:

```
import Image from "next/image";
import React from "react";
import { Message } from "../typings";
import { useSession } from "next-auth/react";
import TimeAgo from "react-timeago"

interface Props {
  key: string;
  message: Message;
}
function MessageComponent({ message }: Props) {
  const { data: session } = useSession();
  // const isUser = true;
  const isUser = session?.user?.email === message.email;

  return (
    <div className={`flex items-center  w-fit ${isUser && "ml-auto"}`}>
      <div className={`flex-shrink-0  ${isUser && "order-2"}`}>
        <Image
          className="rounded-full mx-2"
          height={50}
          width={50}
          src={message.profilePic}
          alt="Profile Picture"
        />
      </div>
      <div>
        <p
          className={`text-[0.65rem] px-[2px] pb-[2px] ${
            isUser ? "text-blue-400 text-right" : "text-red-400 text-left"
          }`}
        >
          {message.username}
        </p>
        <div className="flex items-end">
          <div
            className={`px-3 py-2 rounded-lg w-fit text-white bg-red-400 ${
              isUser ? "bg-blue-400 ml-auto order-2" : "bg-red-400"
            }`}
          >
            <p>{message.message}</p>
          </div>
          <p
            className={`text-[0.65rem] px-2 italic text-gray-300  ${
              isUser && "text-right"
            }`}
          >
            <TimeAgo date={new Date(message.created_at)}/>
            {/* {new Date(message.created_at).toLocaleString()} */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MessageComponent;

```

##### In MessageList.tsx:

```
"use client";
import React, { useEffect } from "react";
import useSWR from "swr";
import { clientPusher } from "../pusher";
import { Message } from "../typings";
import fetcher from "../utils/fetchMessages";
import MessageComponent from "./MessageComponent";

interface Props {
  initialMessages: Message[];
}

function MessageList({ initialMessages }: Props) {
  // Using SWR for data fetching (GET request)
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetcher);
  // console.log(messages);

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");

    // listen for a message
    channel.bind("new-message", async (data: Message) => {
      // console.log("Messages:", messages);
      // If you sent the message, no need to update the cache
      if (messages?.find((message) => message.id === data.id)) return; // Check if the id of message is already in our messages don't update as you pushed the message
      console.log("New message from Pusher:", data.message);

      if (!messages) {
        mutate(fetcher);
      } else {
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        });
      }
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, clientPusher, mutate]);

  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {(messages || initialMessages).map((message) => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  );
}

export default MessageList;

```

## Creating Middleware in NextJS 13:

In the root of the app create middleware.ts:

```
export { default } from "next-auth/middleware";

//Secures the matching routes...
export const config = { matcher: ["/"] };

```

Now when you sign out it throws you to the signIn page based on the [...nextauth].ts file.
