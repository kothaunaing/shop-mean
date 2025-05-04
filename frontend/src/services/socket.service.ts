import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Message, OnlineUserType } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public socket: Socket | null = null;

  apiBaseUrl = 'http://localhost:5000';

  connectSocket(userId: string) {
    if (!userId) {
      return;
    }
    this.socket = io(this.apiBaseUrl, {
      query: { userId },
      reconnection: true,
    });
  }

  // connectUser(userId: string) {
  //   this.socket.emit('user_connected', userId);
  // }

  disconnectUser() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  onOnlineUsersChange(): Observable<OnlineUserType> {
    return new Observable((observer) => {
      if (!this.socket) return;

      const handler = (onlineUser: OnlineUserType) => {
        observer.next(onlineUser);
      };

      this.socket.on('online_users_change', handler);

      return () => {
        this.socket?.off('online_users_chage', handler);
      };
    });
  }

  onNewMessage(): Observable<Message> {
    return new Observable((observer) => {
      if (!this.socket) return;

      const handler = (message: Message) => {
        observer.next(message);
      };
      this.socket.on('new_message', handler);

      return () => {
        this.socket?.off('new_message', handler);
      };
    });
  }
}
