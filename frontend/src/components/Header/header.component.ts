import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthServices } from '../../services/auth.services';

@Component({
  imports: [RouterLink],
  selector: 'header-component',
  templateUrl: 'header.component.html',
})
export class HeaderComponent {
  confirmLogout = signal(false);
  constructor(public authService: AuthServices) {}

  openConfirm() {
    this.confirmLogout.set(true);
  }
  confirmYes() {
    this.authService.logout();
  }

  confirmNo() {
    this.confirmLogout.set(false);
  }
}
