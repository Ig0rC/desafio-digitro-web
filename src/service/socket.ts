import socketIo from 'socket.io-client';

const URL = 'http://dev.digitro.com';


export const socket = socketIo(URL, {
  transports: ['websocket'],
  path: '/callcontrol'
});

