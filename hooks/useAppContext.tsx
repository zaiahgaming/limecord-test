import React, { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';
import { AppState, Action, Message, User } from '../types';
import { INITIAL_STATE } from '../constants';

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  login: (user: User) => void;
  logout: () => void;
  setCurrentServer: (serverId: string) => void;
  setCurrentChannel: (channelId: string) => void;
  sendMessage: (channelId: string, content: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'LOGIN':
      const newUser = action.payload;
      const updatedUsers = { ...state.users };
      // Add the new user to every server's user list so they appear as a member
      for (const serverId in updatedUsers) {
        if (!updatedUsers[serverId].find(u => u.id === newUser.id)) {
          updatedUsers[serverId].push(newUser);
        }
      }
      return { ...state, currentUser: action.payload, users: updatedUsers };
    case 'LOGOUT':
      return { ...state, currentUser: null };
    case 'SET_CURRENT_SERVER':
      const newServerId = action.payload;
      const firstChannelOfNewServer = state.channels[newServerId]?.[0]?.id || '';
      return { 
        ...state, 
        currentServerId: newServerId,
        currentChannelId: firstChannelOfNewServer
      };
    case 'SET_CURRENT_CHANNEL':
      return { ...state, currentChannelId: action.payload };
    case 'ADD_MESSAGE':
      const { channelId } = action.payload;
      return {
        ...state,
        messages: {
          ...state.messages,
          [channelId]: [...(state.messages[channelId] || []), action.payload],
        },
      };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);

  const login = (user: User) => {
    dispatch({ type: 'LOGIN', payload: user });
  };
  
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const setCurrentServer = (serverId: string) => {
    dispatch({ type: 'SET_CURRENT_SERVER', payload: serverId });
  };

  const setCurrentChannel = (channelId: string) => {
    dispatch({ type: 'SET_CURRENT_CHANNEL', payload: channelId });
  };

  const sendMessage = useCallback(async (channelId: string, content: string) => {
    if (!state.currentUser) return;

    const userMessage: Message = {
        id: `msg-${Date.now()}`,
        author: state.currentUser,
        content,
        timestamp: new Date().toISOString(),
        channelId,
    };
    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    
  }, [state.currentUser]);

  return (
    <AppContext.Provider value={{ state, dispatch, login, logout, setCurrentServer, setCurrentChannel, sendMessage }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};