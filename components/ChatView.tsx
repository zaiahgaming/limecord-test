
import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Message from './Message';
import MessageInput from './MessageInput';
import { HashIcon } from './Icons';

const ChatView: React.FC = () => {
  const { state } = useAppContext();
  const { currentServerId, currentChannelId, channels, messages } = state;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const channel = channels[currentServerId]?.find(c => c.id === currentChannelId);
  const channelMessages = messages[currentChannelId] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [channelMessages]);

  if (!channel) {
    return (
      <div className="flex-1 bg-slate-700 flex flex-col">
        <div className="p-4 text-lg font-semibold shadow-md h-14 flex items-center border-b border-slate-900/50">
        </div>
        <div className="flex-1 flex items-center justify-center text-slate-400">
            Select a channel to start chatting.
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-700 flex flex-col">
      <div className="p-4 text-lg font-semibold shadow-md h-14 flex items-center border-b border-slate-900/50">
        <HashIcon className="w-6 h-6 text-slate-400 mr-2" />
        {channel.name}
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {channelMessages.map(msg => (
          <Message key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="px-4 pb-4">
        <MessageInput channel={channel} />
      </div>
    </div>
  );
};

export default ChatView;
