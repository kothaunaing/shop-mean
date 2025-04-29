import { Component, signal } from '@angular/core';
import { Event, Router, RouterLink } from '@angular/router';
import { AuthServices } from '../../services/auth.service';
import { LoginUserType } from '../../types/types';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loading = signal(false);
  errorMessage = signal('');
  errorMessageTimeoutId: any;

  constructor(public authService: AuthServices, private router: Router) {}
  login(event: any, data: LoginUserType) {
    event.preventDefault();

    clearTimeout(this.errorMessageTimeoutId);

    this.errorMessageTimeoutId = setTimeout(() => {
      this.errorMessage.set('');
    }, 5000);

    if (!data.email.trim()) {
      this.errorMessage.set('Email is a required field');
      return;
    }

    if (!data.password.trim()) {
      this.errorMessage.set('Password is a required field');
      return;
    }

    this.loading.set(true);
    this.authService
      .login(data)
      .pipe(
        catchError((error: any) => {
          this.loading.set(false);
          this.errorMessage.set(error.error?.msg);

          console.log(error);
          return throwError(() => new Error('Something went wrong'));
        })
      )
      .subscribe((res: any) => {
        this.authService.currentUser.set(res.user);
        sessionStorage.setItem('token', res.token);
        this.loading.set(false);
        this.router.navigate(['/']);
      });
  }
}
