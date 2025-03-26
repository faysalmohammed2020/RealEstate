import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

interface ChatProps {
  isChatOpen: boolean;
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Chat: React.FC<ChatProps> = ({ isChatOpen, setIsChatOpen }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  // Handle sending a message
  const handleSendMessage = () => {
    if (message.trim()) {
      // Add the user's message to the chat
      setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);

      // Simulate a bot reply (just a simple response for now)
      let botReply = '';
      if (message.toLowerCase() === 'hi') {
        botReply = 'Chatbot: How are you?';
      } else {
        botReply = 'Chatbot: I didn’t understand that.';
      }

      // Simulate the bot's reply after a short delay
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, botReply]);
      }, 500);

      // Clear the input field after sending
      setMessage('');
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <div
        onClick={() => setIsChatOpen(!isChatOpen)} // Toggle the chat window visibility
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full cursor-pointer shadow-lg"
      >
        <MessageCircle className="h-6 w-6" /> Chat
      </div>

      {/* Chat Box */}
      {isChatOpen && (
        <div className="fixed bottom-16 right-4 bg-white p-4 rounded-lg shadow-lg w-80">
          <div className="h-64 overflow-y-auto mb-2">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
                {msg}
              </div>
            ))}
          </div>
          <div className="flex">
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
    </>
  );
};

export default Chat;
