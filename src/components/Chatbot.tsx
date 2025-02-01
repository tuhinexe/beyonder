"use client";

import { Input } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEnter } from "react-icons/ai";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );

  const handleSendMessage = async () => {
    try {
      setLoading(true);
      if (!message.trim()) return;

      // Add user message to the chat
      setMessages((prev) => [...prev, { role: "user", content: message }]);
      setMessage("");

      // Send message to the chatbot API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      if (data.success) {
        setMessages((prev) => [...prev, { role: "bot", content: data.reply }]);
      }
    } catch (error) {
      console.error("Failed to send message to chatbot", error);
      toast.error("Failed to send message to chatbot");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="p-4 h-80 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-center text-gray-500">Loading...</div>}
      </div>
      <div className="p-4 border-t border-gray-200">
        <Input
          endContent={
            <AiOutlineEnter
              size={24}
              className="cursor-pointer"
              onClick={handleSendMessage}
            />
          }
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Type a message..."
        />
      </div>
    </div>
  );
}
