// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";
import { Message } from "../../typings";

type Data = {
  messages: Message[];
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
