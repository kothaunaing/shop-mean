import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Message, OnlineUserType } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public socket: Socket = io();

  apiBaseUrl = 'http://localhost:5000';

  constructor() {
    // this.socket = io(this.apiBaseUrl);
  }

  connectSocket(userId: string) {
    if (!userId) {
      return;
    }
    const socket = io(this.apiBaseUrl, { query: { userId } });
    socket.connect();
    this.socket = socket;
  }

  // connectUser(userId: string) {
  //   this.socket.emit('user_connected', userId);
  // }

  disconnectUser() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }

  onOnlineUsersChange(): Observable<OnlineUserType> {
    return new Observable((observer) => {
      this.socket.on('online_users_change', (onlineUser: OnlineUserType) => {
        observer.next(onlineUser);
      });
    });
  }

  onNewMessage(): Observable<Message> {
    return new Observable((observer) => {
      this.socket.on('new_message', (message: Message) => {
        observer.next(message);
      });
    });
  }
}
