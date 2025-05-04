import { Component, ElementRef, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ChatService } from '../../services/chat.service';
import { AuthServices } from '../../services/auth.service';
import { SocketService } from '../../services/socket.service';
import axios from 'axios';
import { baseApiUrl } from '../../utils/constants';
import { getTokenAndReturnHeader } from '../../utils/getTokenAndReturnHeader';
import { Subject, takeUntil } from 'rxjs';
import { parseISO, format } from 'date-fns';

@Component({
  selector: 'messages-component',
  templateUrl: 'messages.component.html',
  imports: [FontAwesomeModule],
})
export class MessagesComponent {
  faPaperPlane = faPaperPlane;
  faArrowLeft = faArrowLeft;
  private destroy$ = new Subject<void>();

  @ViewChild('latest') lastestMessage!: ElementRef;

  constructor(
    public chatService: ChatService,
    public authService: AuthServices,
    public socketService: SocketService
  ) {}

  scrollToBottom() {
    try {
      this.lastestMessage?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } catch (err: any) {
      console.log('Scroll to bottom failed: ' + err);
    }
  }

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

      setTimeout(() => this.scrollToBottom(), 0);
    }
  }

  handleNewMessage() {
    this.socketService
      .onNewMessage()
      .pipe(takeUntil(this.destroy$))
      .subscribe((message) => {
        console.log('new message arrived');
        this.chatService.messages.push(message);
        setTimeout(() => this.scrollToBottom(), 0);
      });
  }

  async ngOnInit() {
    await this.chatService.getMessages(
      this.authService.currentUser()?._id!,
      this.chatService.userToChat._id!
    );
    setTimeout(() => this.scrollToBottom(), 0);
    this.handleNewMessage();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isMyMessage(id: string) {
    console.log(id);
    return id === this.authService.currentUser()?._id;
  }

  formatCreatedAt(createdAt: string | Date): string {
    const date =
      typeof createdAt === 'string' ? parseISO(createdAt) : createdAt;
    return format(date, 'PPPp'); // Example: Apr 4, 2025 at 10:30 AM
  }
}
