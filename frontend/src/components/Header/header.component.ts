import { Component, effect, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServices } from '../../services/auth.services';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'header-component',
  templateUrl: 'header.component.html',
})
export class HeaderComponent {
  accountDetailsShown = signal(false);

  confirmLogout = signal(false);
  constructor(public authService: AuthServices) {
    effect(() => {
      document.body.style.overflow = this.confirmLogout() ? 'hidden' : '';
    });
  }

  openConfirm() {
    this.confirmLogout.set(true);
  }
  confirmYes() {
    this.confirmLogout.set(false);
    this.authService.logout();
    this.accountDetailsShown.set(false);
  }

  confirmNo() {
    this.confirmLogout.set(false);
  }

  toggleAccountDetails() {
    this.accountDetailsShown.update((prev) => !prev);
  }
}
