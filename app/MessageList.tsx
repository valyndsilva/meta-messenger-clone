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
