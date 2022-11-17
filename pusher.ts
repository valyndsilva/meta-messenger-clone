import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  // appId: process.env.PUSHER_APP_ID!,
  // key: process.env.PUSHER_KEY!,
  // secret: process.env.PUSHER_SECRET!,
  // cluster: process.env.PUSHER_CLUSTER!,
  // useTLS: true,
  appId: "1507928",
  key: "591a7752fe0dac421398",
  secret: "0b7789d196b286446f5a",
  cluster: "eu",
  useTLS: true,
});

export const clientPusher = new ClientPusher("591a7752fe0dac421398", {
  cluster: process.env.PUSHER_CLUSTER!,
  forceTLS: true,
});
