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
