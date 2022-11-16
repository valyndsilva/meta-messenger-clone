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
