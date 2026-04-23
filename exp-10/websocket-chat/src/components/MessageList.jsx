import { useEffect, useRef } from "react";

function MessageList({ messages, username }) {
  return (
    <div className="messages">
      {messages.map((msg, i) => {
        const isMe = msg.sender === username;

        return (
          <div
            key={i}
            className={`message-row ${isMe ? "right" : "left"}`}
          >
            {!isMe && (
              <div className="avatar">
                {msg.sender.charAt(0).toUpperCase()}
              </div>
            )}

            <div className={`bubble ${isMe ? "my" : ""}`}>
              <div className="sender">{msg.sender}</div>
              <div>{msg.content}</div>
              <small>
                {new Date().toLocaleTimeString()}
              </small>
            </div>

            {isMe && (
              <div className="avatar">
                {msg.sender.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default MessageList;