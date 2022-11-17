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
