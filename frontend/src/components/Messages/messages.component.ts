import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ChatService } from '../../services/chat.service';
import { AuthServices } from '../../services/auth.service';
import { SocketService } from '../../services/socket.service';
import axios from 'axios';
import { baseApiUrl } from '../../utils/constants';
import { getTokenAndReturnHeader } from '../../utils/getTokenAndReturnHeader';

@Component({
  selector: 'messages-component',
  templateUrl: 'messages.component.html',
  imports: [FontAwesomeModule],
})
export class MessagesComponent {
  faPaperPlane = faPaperPlane;
  faArrowLeft = faArrowLeft;

  constructor(
    public chatService: ChatService,
    public authService: AuthServices,
    public socketService: SocketService
  ) {}

  isUserOnline(userId: string) {
    return this.chatService.onlineUsers.some(
      (user) => user.userId === userId && user.isOnline
    );
  }

  async sendMessage(text: string) {
    if (text.trim()) {
      const newMessage = {
        senderId: this.authService.currentUser()?._id,
        receiverId: this.chatService.userToChat._id,
        text,
      };
      const res = await axios.post(baseApiUrl + '/message/send', newMessage, {
        headers: getTokenAndReturnHeader('token'),
      });
      if (
        this.authService.currentUser()?._id !== this.chatService.userToChat._id
      ) {
        this.chatService.messages.push(res.data.message);
      }
    }
  }

  handleNewMessage() {
    this.socketService.onNewMessage().subscribe((message) => {
      console.log('new message arrived');
      this.chatService.messages.push(message);
    });
  }

  ngOnInit() {
    this.chatService.getMessages(
      this.authService.currentUser()?._id!,
      this.chatService.userToChat._id!
    );
    this.handleNewMessage();
  }
}
