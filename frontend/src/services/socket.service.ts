import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { OnlineUserType } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  apiBaseUrl = 'http://localhost:5000';

  constructor() {
    this.socket = io(this.apiBaseUrl);
  }

  connectUser(userId: string) {
    this.socket.emit('user_connected', userId);
  }

  disconnectUser(userId: string) {
    this.socket.emit('user_disconnected', userId);
  }

  onOnlineUsersChange() {
    let user: OnlineUserType | undefined = undefined;

    this.socket.on('online_users_change', (onlineUser: OnlineUserType) => {
      if (onlineUser) {
        console.log(onlineUser);
        user = onlineUser;
      }
    });

    return user;
  }
}
