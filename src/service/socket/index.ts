import socketIo from 'socket.io-client';


const socket = socketIo(import.meta.env.VITE_DNS_WEBSOCKET, {
  transports: ['websocket'],
  path: import.meta.env.VITE_PATH_WEBSOCKET,
});


export { socket}


