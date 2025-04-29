import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServices } from '../../services/auth.service';
import { CreateUserType } from '../../types/types';
import { catchError, of, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  loading = signal(false);
  errorMessage = signal('');
  errorMessageTimeoutId: any;

  constructor(public authService: AuthServices, private router: Router) {}

  register(userData: CreateUserType) {
    clearTimeout(this.errorMessageTimeoutId);

    this.errorMessageTimeoutId = setTimeout(() => {
      this.errorMessage.set('');
    }, 5000);

    if (!userData.name.trim()) {
      this.errorMessage.set('Name is a required field');
      return;
    }

    if (!userData.username.trim()) {
      this.errorMessage.set('Username is a required field');
      return;
    }

    if (!userData.email.trim()) {
      this.errorMessage.set('Email is a required field');
      return;
    }

    if (!userData.password.trim()) {
      this.errorMessage.set('Password is a required field');
      return;
    }

    if (userData.password.length < 12) {
      this.errorMessage.set('Password must be at least 12 characters');
      return;
    }

    this.loading.set(true);

    this.authService
      .register(userData)
      .pipe(
        catchError((error: any) => {
          this.errorMessage.set(error?.error?.msg);
          this.loading.set(false);
          console.error('Error in register: ' + error.message);
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
