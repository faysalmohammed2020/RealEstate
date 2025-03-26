// components/Chat.tsx

import { useState } from 'react';
import { MessageCircle } from 'lucide-react'; // Import MessageCircle icon from lucide-react

const Chat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add the user's message to the messages array first
      const userMessage = `You: ${message}`;
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Check for the message and respond
      let botReply = '';
      if (message.toLowerCase() === 'hi') {
        botReply = 'Chatbot: How are you?';
      } else if (message.toLowerCase() === 'hello') {
        botReply = 'Chatbot: Hello there!';
      } else {
        botReply = 'Chatbot: Hello There!.';
      }

      // Add bot's reply after a delay (simulating real-time response)
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, botReply]);
      }, 500); // Adds a delay before the bot responds

      setMessage(''); // Clear the input field
    }
  };

  return (
    <div>
      {/* Chat Button with Lucide MessageCircle Icon */}
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-16 right-4 bg-white p-4 rounded-lg shadow-lg w-80">
          <div className="h-64 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
                {msg}
              </div>
            ))}
          </div>
          <div className="flex mt-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-l"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white p-2 rounded-r"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
