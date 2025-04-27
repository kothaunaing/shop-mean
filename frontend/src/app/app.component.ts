import { Component, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthServices } from '../services/auth.services';
import { HeaderComponent } from '../components/Header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';

  constructor(public authService: AuthServices) {}

  ngOnInit() {
    this.authService.checkAuth();
  }
}
