import React from 'react';
import { useAppContext } from '../hooks/useAppContext';

const UserList: React.FC = () => {
  const { state } = useAppContext();
  const { currentServerId, users } = state;
  const serverUsers = users[currentServerId] || [];

  return (
    <div className="w-60 bg-slate-800 flex flex-col p-2">
       <div className="px-2 pt-2 text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">
          Members — {serverUsers.length}
        </div>
      <div className="flex-1 overflow-y-auto space-y-2">
        {serverUsers.map(user => (
          <div key={user.id} className="flex items-center p-2 rounded hover:bg-slate-700/50">
            <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full mr-3" />
            <span className="font-medium text-slate-200">{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
