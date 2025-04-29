import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServices } from '../../services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddNewProductComponent } from '../AddNewProduct/add-new-product.component';
import { AddProductService } from '../../services/add-product.service';
import {
  faAdd,
  faCartShopping,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { SearchComponent } from '../SearchComponent/search.component';
import { CartService } from '../../services/cart.service';

@Component({
  imports: [
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule,
    AddNewProductComponent,
    SearchComponent,
  ],
  selector: 'header-component',
  templateUrl: 'header.component.html',
})
export class HeaderComponent {
  accountDetailsShown = signal(false);
  cartService = inject(CartService);

  faAdd = faAdd;
  faSearch = faSearch;
  faCartShopping = faCartShopping;

  confirmLogout = signal(false);
  constructor(
    public authService: AuthServices,
    public addProductService: AddProductService
  ) {
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
