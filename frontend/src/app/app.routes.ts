import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { redirectIfAuthenticatedGuard } from './redirect-if-authenticated.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [redirectIfAuthenticatedGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    // canActivate: [redirectIfAuthenticatedGuard],
  },
];
