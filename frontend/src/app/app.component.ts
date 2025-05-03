import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthServices } from '../services/auth.service';
import { HeaderComponent } from '../components/Header/header.component';
import { CartService } from '../services/cart.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  cartService = inject(CartService);
  socketService = inject(SocketService);

  constructor(public authService: AuthServices) {
    effect(() => {
      if (this.authService.currentUser()) {
        this.fetchCartItemsCount();
      } else {
        this.cartService.cartItemsCount = 0;
      }
    });
  }

  ngOnInit() {
    this.authService.checkAuth();
    // this.fetchCartItemsCount();
  }

  fetchCartItemsCount() {
    this.cartService.getCartItemsCount();
  }
}
