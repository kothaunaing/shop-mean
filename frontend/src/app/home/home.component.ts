import { Component, effect } from '@angular/core';
import { AuthServices } from '../../services/auth.services';
import { HeaderComponent } from '../../components/Header/header.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(public authService: AuthServices) {}
}
