import io, { Socket } from 'socket.io-client';

let socket:Socket;

import { SOCKET_URL } from './axiosConfig';
import { MiseAuctifySended, UserInfoSended } from './socketInterface';


export const initiateSocket = () => {
  socket = io(SOCKET_URL);
  console.log(`Connecting socket...`, SOCKET_URL);
}

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) socket.disconnect();
}


export const onJoinEnchere = (cb:any) => {
  if (!socket) return (true);
  socket.on('joinAuction', msg => {
    console.log('Websocket event received!');
    return cb(null, msg);
  });
}

export const setJoinEnchere = (data:UserInfoSended) => {
  if (socket) socket.emit('joinAuction', data);
}


export const onMiseAuctify = (cb:any) => {
  if (!socket) return (true);
  socket.on('resetMise', msg => {
    console.log('Websocket event received!');
    return cb(null, msg);
  });
}

export const addMiseAuctify = (data:MiseAuctifySended) => {
  console.log('Websocket event received!');
  if (socket) socket.emit('AuctifyBet', data);
}



export const onUnJoinEnchere = (cb:any) => {
  if (!socket) return (true);
  socket.on('UnjoinAuction', msg => {
    console.log('unjoin Websocket event received!');
    return cb(null, msg);
  });
}

export const onNotifications = (cb: any) => {
  if (!socket) return true;
  socket.on("newNotification", (msg) => {
    console.log("unjoin Websocket event received!");
    return cb(null, msg);
  });
};

export const onAuctionWin = (socketPlayerId: any, callback: any) => {
  if (!socket) return;
  socket.on("newWinner", (msg) => {
    console.log("New WebSocket event received!");

    // Check if the playerId from the event matches the socket player's ID
    if (msg.playerId === socketPlayerId) {
      callback(); // If it matches, trigger the callback (Toast in this case)
    }
  });
};