import { AppState, User } from './types';

export const INITIAL_STATE: AppState = {
  currentUser: null,
  servers: [
    { id: '1', name: 'Lime Lounge', imageUrl: '/lime-logo.png' },
    { id: '2', name: 'Citrus Coders', imageUrl: '/react-logo.png' },
  ],
  channels: {
    '1': [
      { id: '101', name: 'general', serverId: '1' },
      { id: '102', name: 'help-desk', serverId: '1' },
    ],
    '2': [
      { id: '201', name: 'hooks-discussion', serverId: '2' },
      { id: '202', name: 'component-showcase', serverId: '2' },
    ],
  },
  users: {
    '1': [
      { id: 'u1', name: 'Alice', avatarUrl: '/avatar1.png' },
      { id: 'u2', name: 'Bob', avatarUrl: '/avatar2.png' },
    ],
    '2': [
        { id: 'u1', name: 'Alice', avatarUrl: '/avatar1.png' },
        { id: 'u3', name: 'Charlie', avatarUrl: '/avatar3.png' },
    ],
  },
  messages: {
    '101': [
      {
        id: 'm1',
        author: { id: 'u1', name: 'Alice', avatarUrl: '/avatar1.png' },
        content: 'Hey everyone! This new theme is fresh.',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        channelId: '101',
      },
      {
        id: 'm2',
        author: { id: 'u2', name: 'Bob', avatarUrl: '/avatar2.png' },
        content: 'Agreed! It looks great.',
        timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
        channelId: '101',
      },
    ],
    '102': [],
    '201': [],
    '202': [],
  },
  currentServerId: '1',
  currentChannelId: '101',
};