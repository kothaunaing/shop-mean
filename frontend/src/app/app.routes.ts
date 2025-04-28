import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
import { ProductComponent } from './product/product.component';
import { SearchPageComponent } from './search-page/search-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: 'product/:id',
    component: ProductComponent,
  },
  {
    path: 'search',
    component: SearchPageComponent,
  },
];
