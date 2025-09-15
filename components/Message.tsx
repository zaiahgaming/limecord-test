import React from 'react';
import type { Message as MessageType } from '../types';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { author, content, timestamp } = message;
  const time = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex items-start p-2 rounded-md hover:bg-slate-700/30">
      <img src={author.avatarUrl} alt={author.name} className="w-10 h-10 rounded-full mr-4" />
      <div>
        <div className="flex items-baseline">
          <span className="font-semibold text-lime-400 mr-2">{author.name}</span>
          <span className="text-xs text-slate-400">{time}</span>
        </div>
        <p className="text-slate-200">{content}</p>
      </div>
    </div>
  );
};

export default Message;
