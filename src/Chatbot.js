import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X } from "lucide-react";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const sendMessageToRasa = async (userMessage) => {
    try {
      const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: "student", message: userMessage }),
      });

      const data = await response.json();
      console.log("Rasa Response:", data);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data[0]?.text || "Sorry, I didn't understand.", sender: "sophie" },
      ]);
    } catch (error) {
      console.error("Error communicating with Rasa:", error);
    }
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    setMessages([...messages, { text: input, sender: "student" }]);
    sendMessageToRasa(input);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Chatbot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        <Bot size={24} />
      </button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-16 right-5 w-80 bg-white rounded-2xl shadow-lg border border-gray-200"
          >
            {/* Header with Close Button */}
            <div className="p-3 bg-blue-500 text-white text-center font-semibold rounded-t-2xl flex justify-between items-center">
              <span>Chat with Sophie</span>
              <button onClick={() => setIsOpen(false)} className="p-1">
                <X size={16} />
              </button>
            </div>

            <div className="h-64 p-3 overflow-y-auto flex flex-col space-y-2">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: msg.sender === "student" ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-2 rounded-lg ${
                    msg.sender === "student"
                      ? "bg-blue-100 self-end"
                      : "bg-gray-200 self-start"
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
            </div>

            {/* Input Field */}
            <div className="p-3 flex border-t border-gray-300">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="Ask Sophie something..."
              />
              <button
                onClick={handleSend}
                className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Chatbot;
