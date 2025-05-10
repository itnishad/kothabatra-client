import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Paperclip, Send, Mic, Phone, Video } from 'lucide-react';

type Message = {
  id: string;
  text: string;
  sender: 'me' | 'other';
  time: string;
};

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hey there! How are you?',
    sender: 'other',
    time: '10:30 AM',
  },
  {
    id: '2',
    text: "I'm good, thanks! How about you?",
    sender: 'me',
    time: '10:32 AM',
  },
  {
    id: '3',
    text: 'Doing well! Just working on that project we discussed last week.',
    sender: 'other',
    time: '10:33 AM',
  },
  {
    id: '4',
    text: "Oh nice! How's it going so far?",
    sender: 'me',
    time: '10:34 AM',
  },
  {
    id: '5',
    text: "It's coming along great! I think we'll be able to finish it before the deadline.",
    sender: 'other',
    time: '10:36 AM',
  },
  {
    id: '6',
    text: "That's awesome news! Let me know if you need any help with it.",
    sender: 'me',
    time: '10:37 AM',
  },
];

export const ConversationArea = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sender: 'me',
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white border-b border-gray-200 p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://ui-avatars.com/api/?name=John+Doe&background=random"
            alt="John Doe"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-gray-100"
            title="Audio Call"
          >
            <Phone className="h-5 w-5 text-gray-600" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-gray-100"
            title="Video Call"
          >
            <Video className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === 'me' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[75%] rounded-lg px-4 py-2 ${
                  msg.sender === 'me'
                    ? 'bg-purple-600 text-white rounded-br-none'
                    : 'bg-white shadow-sm rounded-bl-none'
                }`}
              >
                <p>{msg.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.sender === 'me' ? 'text-purple-100' : 'text-gray-500'
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Paperclip className="h-5 w-5 text-gray-500" />
          </Button>

          <div className="relative flex-1">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="min-h-[40px] max-h-[100px] py-2 pr-10 resize-none border-gray-300 rounded-full"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 p-0 flex items-center justify-center"
              disabled={!message.trim()}
              onClick={handleSendMessage}
            >
              {message.trim() ? (
                <Send className="h-5 w-5 text-purple-600" />
              ) : (
                <Mic className="h-5 w-5 text-gray-500" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
