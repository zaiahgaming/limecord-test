export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Server {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Channel {
  id: string;
  name: string;
  serverId: string;
}

export interface Message {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  channelId: string;
}

export interface AppState {
  currentUser: User | null;
  servers: Server[];
  channels: Record<string, Channel[]>; // serverId -> channels
  users: Record<string, User[]>; // serverId -> users
  messages: Record<string, Message[]>; // channelId -> messages
  currentServerId: string;
  currentChannelId: string;
}

export type Action =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_CURRENT_SERVER'; payload: string }
  | { type: 'SET_CURRENT_CHANNEL'; payload: string }
  | { type: 'ADD_MESSAGE'; payload: Message };
