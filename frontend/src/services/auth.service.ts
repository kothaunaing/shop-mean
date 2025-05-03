import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CreateUserType, CurrentUserType, LoginUserType } from '../types/types';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  checkingAuth = signal(true);

  currentUser = signal<CurrentUserType | null>(null);

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private router: Router, private socketService: SocketService) {}

  register(data: CreateUserType) {
    return this.http.post(this.apiUrl + '/register', data, {
      withCredentials: true,
    });
  }

  login(data: LoginUserType) {
    return this.http.post(this.apiUrl + '/login', data, {
      withCredentials: true,
    });
  }

  logout() {
    this.http
      .get(this.apiUrl + '/logout', { withCredentials: true })
      .subscribe((res) => {
        console.log('Logged out successfully');
        this.socketService.disconnectUser();
        sessionStorage.removeItem('token');
        this.currentUser.set(null);
        this.router.navigate(['/login']);
      });
  }

  checkAuth() {
    this.checkingAuth.set(true);
    const token = sessionStorage.getItem('token');
    this.http
      .get(this.apiUrl + '/check-auth', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        catchError((error: any) => {
          this.checkingAuth.set(false);
          this.router.navigate(['/login']);
          return throwError(() => new Error('Something went wrong'));
        })
      )
      .subscribe((res: any) => {
        this.checkingAuth.set(false);

        this.socketService.connectSocket(res.user._id);

        this.currentUser.set(res.user);
      });
  }
}
