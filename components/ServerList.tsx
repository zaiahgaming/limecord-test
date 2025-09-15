import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { PlusIcon } from './Icons';

const ServerList: React.FC = () => {
  const { state, setCurrentServer } = useAppContext();
  const { servers, currentServerId } = state;

  return (
    <div className="w-16 bg-slate-900 flex flex-col items-center py-3 space-y-3">
      {/* Home/DM icon */}
      <button className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-lime-400 font-bold text-xl focus:outline-none transition-all duration-200 hover:bg-lime-500 hover:text-white hover:rounded-2xl">
        L
      </button>
      <div className="h-px w-8 bg-slate-700"></div>
      
      {servers.map(server => (
        <button
          key={server.id}
          onClick={() => setCurrentServer(server.id)}
          className={`w-12 h-12 rounded-full flex items-center justify-center focus:outline-none transition-all duration-200 group`}
        >
          <img 
            src={server.imageUrl} 
            alt={server.name} 
            className={`w-full h-full object-cover rounded-full transition-all duration-200 ${
              currentServerId === server.id
                ? 'rounded-2xl'
                : 'group-hover:rounded-2xl'
            }`} 
          />
           <div 
            className={`absolute left-0 h-0 w-1 bg-white rounded-r-full transition-all duration-200 ${
              currentServerId === server.id
                ? 'h-10'
                : 'group-hover:h-5'
            }`}
          ></div>
        </button>
      ))}

      {/* Add server icon */}
      <button className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-green-500 focus:outline-none transition-all duration-200 hover:bg-green-500 hover:text-white hover:rounded-2xl">
        <PlusIcon />
      </button>
    </div>
  );
};

export default ServerList;
