import React from 'react';
import ServerList from './components/ServerList';
import ChannelList from './components/ChannelList';
import ChatView from './components/ChatView';
import UserList from './components/UserList';
import LoginScreen from './components/LoginScreen';
import { useAppContext } from './hooks/useAppContext';

const App: React.FC = () => {
  const { state } = useAppContext();

  if (!state.currentUser) {
    return <LoginScreen />;
  }

  return (
    <div className="flex h-screen text-white bg-slate-800">
      <ServerList />
      <ChannelList />
      <ChatView />
      <UserList />
    </div>
  );
};

export default App;
