
import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import type { Channel } from '../types';

interface MessageInputProps {
  channel: Channel;
}

const MessageInput: React.FC<MessageInputProps> = ({ channel }) => {
  const [inputValue, setInputValue] = useState('');
  const { sendMessage } = useAppContext();

  const handleSendMessage = async (content: string) => {
    if (content.trim() === '') return;

    await sendMessage(channel.id, content);
    setInputValue('');
  };

  return (
    <div className="bg-slate-600 rounded-lg flex items-center px-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage(inputValue);
          }
        }}
        placeholder={`Message #${channel.name}`}
        className="w-full bg-transparent p-3 focus:outline-none text-slate-200 placeholder-slate-400"
      />
    </div>
  );
};

export default MessageInput;