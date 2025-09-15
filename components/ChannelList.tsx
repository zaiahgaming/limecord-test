import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { HashIcon, CogIcon } from './Icons';

const ChannelList: React.FC = () => {
  const { state, setCurrentChannel } = useAppContext();
  const { currentServerId, currentChannelId, servers, channels, currentUser } = state;

  const server = servers.find(s => s.id === currentServerId);
  const serverChannels = channels[currentServerId] || [];

  if (!server) return null;

  return (
    <div className="w-60 bg-slate-800 flex flex-col">
      <div className="p-4 font-bold text-lg shadow-md h-14 flex items-center border-b border-slate-900/50">
        {server.name}
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        <div className="px-2 text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">
          Text Channels
        </div>
        {serverChannels.map(channel => (
          <button
            key={channel.id}
            onClick={() => setCurrentChannel(channel.id)}
            className={`w-full text-left flex items-center px-2 py-1.5 rounded transition-colors ${
              currentChannelId === channel.id
                ? 'bg-slate-600/50 text-white'
                : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
            }`}
          >
            <HashIcon className="w-5 h-5 mr-2" />
            <span className="font-medium">{channel.name}</span>
          </button>
        ))}
      </div>
      {currentUser && (
        <div className="p-2 bg-slate-900/70 flex items-center justify-between">
            <div className="flex items-center">
                <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-8 h-8 rounded-full mr-2" />
                <span className="font-semibold text-sm">{currentUser.name}</span>
            </div>
            <button className="text-slate-400 hover:text-slate-200">
                <CogIcon />
            </button>
        </div>
      )}
    </div>
  );
};

export default ChannelList;
