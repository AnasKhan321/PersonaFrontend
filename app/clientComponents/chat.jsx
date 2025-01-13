'use client'

import { useState, useEffect } from 'react'
import { Send, User } from 'lucide-react'
import { useSocket } from '../appcontext/Socketcontext'
import { ReactTyped } from "react-typed";


export default function Chat(data) {
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const {socket} = useSocket()

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (message.trim()) {
      setChatHistory((prev) => [...prev, { sender: 'user', content: message }]);
      console.log(chatHistory)
      socket.emit("message", JSON.stringify({ username: data.username, question: message   , messages : chatHistory}));
      
      setMessage('');
  
      socket.once("send:message", (data) => {
        const pdata = JSON.parse(data);
        console.log(pdata);
        setChatHistory((prev) => [...prev, { sender: "assistant", content: pdata.message }]);
      });
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
      

        <div className="bg-gray-800 rounded-lg p-4 h-[75vh] max-h-[75vh]  overflow-y-scroll mb-4">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : ''}`}>

              {msg.sender === "user" ? 
              <span className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-100'}`}>
                {msg.content}
              </span>  : <div className='bg-gray-700 text-gray-100 p-2 rounded-md '>  <ReactTyped strings={[msg.content]} typeSpeed={10}   loop={false}/> </div>  }
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow p-2 border border-gray-700 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Type your message..."
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
            <Send className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  )
}

