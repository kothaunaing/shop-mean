import { Injectable, signal } from '@angular/core';
import axios from 'axios';
import { getTokenAndReturnHeader } from '../utils/getTokenAndReturnHeader';
import {
  AllUserResponseType,
  CreateUserType,
  Message,
  OnlineUserType,
} from '../types/types';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  usersData!: AllUserResponseType | null;
  apiUrl = 'http://localhost:5000/api';
  page = signal('home');
  onlineUsers: OnlineUserType[] = [];
  messages: Message[] = [];
  userToChat!: CreateUserType;

  constructor(private socketService: SocketService) {}

  changePage(page: string) {
    this.page.set(page);
  }

  async getAllUsers() {
    try {
      const res = await axios.get(this.apiUrl + '/user/all-users', {
        headers: getTokenAndReturnHeader('token'),
      });
      console.log(res.data);
      this.usersData = res.data;
    } catch (error: any) {
      console.log('Error in getAllUsers: ' + error.message);
    }
  }

  async getOnlineUsers() {
    try {
      const res = await axios.get(this.apiUrl + '/user/online-users', {
        headers: getTokenAndReturnHeader('token'),
      });
      console.log(res.data);
      this.onlineUsers = res.data.users;
    } catch (error: any) {
      console.log('Error in getAllUsers: ' + error.message);
    }
  }

  async getMessages(senderId: string, receiverId: string) {
    try {
      const res = await axios.get(this.apiUrl + '/message/get-all', {
        headers: getTokenAndReturnHeader('token'),
        params: {
          senderId,
          receiverId,
        },
      });
      this.messages = res.data.messages;
      console.log(res.data);
    } catch (error: any) {
      console.log('Error in getMessages: ' + error);
    }
  }
}
