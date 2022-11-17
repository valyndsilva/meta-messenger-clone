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
