import { useState, useEffect, useRef } from 'react';
import './index.css'
import { sendMessageToBot } from './api';

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [isTyping, setIsTyping] = useState(false);



  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);



  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const botResponse = await sendMessageToBot(input);

    setTimeout(() => {
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="flex h-screen bg-black text-zinc-100 font-sans overflow-hidden">
      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col relative min-w-0">
        {/* Header */}
        <header className="py-4 px-6 bg-black/80 backdrop-blur-md border-b border-zinc-800 flex justify-between items-center z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-white tracking-tight">Knowledge<span className="text-blue-500">Bot</span></h1>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> SERVER LIVE
          </div>
        </header>

        {/* Message Area */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-5 py-3 rounded-2xl ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-lg'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none'
                }`}>
                  <p className="text-[14.5px] leading-relaxed">{m.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-zinc-900 border border-zinc-800 px-5 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </main>

        {/* Input Form */}
        <footer className="p-6 bg-black">
          <div className="max-w-3xl mx-auto relative group">
            <input
              type="text"
              className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-2xl pl-5 pr-16 py-4
                         focus:outline-none focus:border-blue-500 transition-all placeholder:text-zinc-600 shadow-2xl"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 text-white px-5 rounded-xl font-semibold transition-all"
            >
              Send
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;