"use client";

import { useState } from "react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  async function sendMessage() {
    if (!input) return;

    const userMsg = input;
    setMessages((m) => [...m, "You: " + userMsg]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: userMsg }),
    });

    const data = await res.json();
    setMessages((m) => [...m, "Bot: " + data.reply]);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="w-72 bg-white border rounded-xl shadow p-3 mb-2">
          <div className="h-40 overflow-y-auto text-sm space-y-1">
            {messages.map((m, i) => (
              <div key={i}>{m}</div>
            ))}
          </div>

          <div className="flex gap-2 mt-2">
            <input
              className="border rounded px-2 py-1 flex-1 text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about fruits..."
            />
            <button
              onClick={sendMessage}
              className="px-3 py-1 bg-black text-white rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-black text-white font-bold"
      >
        💬
      </button>
    </div>
  );
}
