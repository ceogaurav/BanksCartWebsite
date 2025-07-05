import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

const LoanLiveChat = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        aria-label="Open live chat"
        className="bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400"
        onClick={() => setOpen((v) => !v)}
      >
        <MessageCircle className="h-6 w-6" />
      </button>
      {open && (
        <div
          className="mt-2 w-80 bg-white/90 rounded-2xl shadow-xl p-4 flex flex-col"
          role="dialog"
          aria-modal="true"
        >
          <div className="font-bold text-primary-700 mb-2">Live Chat</div>
          <div className="text-gray-700 text-sm mb-3">Hi! How can we help you with your loan today?</div>
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 mb-2"
            aria-label="Type your message"
          />
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-all">Send</button>
        </div>
      )}
    </div>
  );
};

export default LoanLiveChat;
