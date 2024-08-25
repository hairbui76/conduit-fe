'use client';

import { createContext, useEffect, useState } from 'react';

import { io, Socket } from 'socket.io-client';
import { SocketStatus } from '@/types/Socket';

export const SocketContext = createContext<{ socket: Socket | undefined; status: SocketStatus }>({
  socket: undefined,
  status: 'waiting'
});

export function SocketProvider({
  token,
  socketHost,
  username,
  children
}: {
  token: string | undefined;
  socketHost: string;
  username: string | undefined;
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<Socket | undefined>();
  const [status, setStatus] = useState<SocketStatus>('waiting');

  useEffect(() => {
    if (token) {
      const socket = io(socketHost, {
        query: {
          username
        }
      });

      socket.on('connect', () => {
        setStatus('connected');
        setSocket(socket);
        socket.emit('post', username);
      });

      socket.on('connect_error', () => {
        setStatus('error');
      });

      socket.on('disconnect', () => {
        setStatus('disconnected');
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [socketHost, token, username]);

  return <SocketContext.Provider value={{ socket, status }}>{children}</SocketContext.Provider>;
}
