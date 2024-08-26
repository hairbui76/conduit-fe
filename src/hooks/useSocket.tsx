import { useContext } from 'react';

import { SocketContext } from '@/contexts/socket';

export function useSocket() {
  const context = useContext(SocketContext);
  if (context === null) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}