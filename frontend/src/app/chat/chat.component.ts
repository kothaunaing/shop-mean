import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faClose,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { ChatService } from '../../services/chat.service';
import { CreateUserType, OnlineUserType } from '../../types/types';
import { AuthServices } from '../../services/auth.service';
import { SocketService } from '../../services/socket.service';
import { MessagesComponent } from '../../components/Messages/messages.component';

@Component({
  selector: 'app-chat',
  imports: [FontAwesomeModule, RouterLink, MessagesComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  faArrowLeft = faArrowLeft;
  faPaperPlane = faPaperPlane;
  faClose = faClose;

  constructor(
    public chatService: ChatService,
    public authService: AuthServices,
    public socketService: SocketService
  ) {}

  ngOnInit() {
    this.chatService.getAllUsers();
    this.chatService.getOnlineUsers();

    this.handleOnlineUser();
  }

  handleOnlineUser() {
    this.socketService.onOnlineUsersChange().subscribe((onlineUser) => {
      const exists = this.chatService.onlineUsers.some(
        (user) => user.userId === onlineUser.userId
      );

      if (exists) {
        const newUsers = this.chatService.onlineUsers.map((user) => {
          return onlineUser.userId === user.userId ? onlineUser : user;
        });
        this.chatService.onlineUsers = newUsers;
      } else {
        this.chatService.onlineUsers.push(onlineUser);
        console.log(onlineUser);
      }
    });
  }

  setUserToChat(user: CreateUserType) {
    this.chatService.userToChat = user;
  }

  getNumberOnlineUsers() {
    return this.chatService.onlineUsers.filter((user) => user.isOnline).length;
  }

  isUserOnline(userId: string) {
    return this.chatService.onlineUsers.some(
      (user) => user.userId === userId && user.isOnline
    );
  }
}
