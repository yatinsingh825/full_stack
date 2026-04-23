import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const clientRef = useRef(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://127.0.0.1:8080/ws"),
      reconnectDelay: 5000,

      onConnect: () => {
  console.log("✅ Connected to WebSocket");

  client.subscribe("/topic/messages", (msg) => {
    const data = JSON.parse(msg.body);
    setMessages((prev) => [...prev, data]);
  });
},

onWebSocketError: (error) => {
  console.error("❌ WebSocket Error:", error);
},

onStompError: (frame) => {
  console.error("❌ STOMP Error:", frame);
},

      onStompError: (frame) => {
        console.error("Broker error: ", frame.headers["message"]);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => client.deactivate();
  }, []);

  const sendMessage = (text) => {
  if (!clientRef.current || !clientRef.current.connected) {
    console.log("⚠️ Not connected yet");
    return;
  }

  if (!text || !username) return;

  clientRef.current.publish({
    destination: "/app/send",
    body: JSON.stringify({
      sender: username,
      content: text,
    }),
  });
};

  return (
    <div className="chat-box">
      <input
        className="username"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <MessageList messages={messages} username={username} />
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
}

export default Chat;