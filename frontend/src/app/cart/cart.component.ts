import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { PaginationComponent } from '../../components/Pagination/pagination.component';
import { SeeMoreComponent } from '../../components/SeeMore/see-more.component';
import { AuthServices } from '../../services/auth.service';
import { CartItemComponent } from '../../components/CartItem/cart-item.component';

@Component({
  selector: 'app-cart',
  imports: [PaginationComponent, RouterLink, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  page: number = 1;

  private route = inject(ActivatedRoute);
  cartService = inject(CartService);
  authService = inject(AuthServices);

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const page = Number(params['page']) || 1;
      this.page = page;
      this.cartService.getAllCartItems(page);
    });
  }
}
