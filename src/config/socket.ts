import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initSocket = (accessToken: string) => {
  socket = io('http://localhost:8000', {
    auth: { accessToken },
    autoConnect: false,
  });

  socket.connect();

  socket.on('connect', () => {
    console.log('Socket connected:', socket?.id);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  return socket;
};
export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
