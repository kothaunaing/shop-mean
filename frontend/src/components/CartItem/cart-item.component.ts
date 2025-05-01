import { Component, inject, Input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SingleCartItem } from '../../types/types';
import { shippingTypes } from '../../utils/constants';
import { formatDate } from '../../utils/formatDate';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'cart-item-component',
  templateUrl: 'cart-item.component.html',
  imports: [RouterLink],
})
export class CartItemComponent {
  @Input() item!: SingleCartItem;
  selectedOption = 1;
  showUpdateQuantity = signal(false);
  updatingQuantity = signal(false);
  cartService = inject(CartService);

  getDeliveryOption(id: number) {
    return shippingTypes[id - 1];
  }

  changeSelectedOption(id: number) {
    this.selectedOption = id;
  }

  date(timestamp: number) {
    return formatDate(timestamp);
  }

  openUpdateQuantity() {
    this.showUpdateQuantity.set(true);
  }

  closeUpdateQuantity() {
    this.showUpdateQuantity.set(false);
  }

  async updateQuantity(id: string, quantity: string, originalQuantity: number) {
    try {
      this.updatingQuantity.set(true);

      await this.cartService.updateCartQuantity(id, quantity, originalQuantity);
    } catch (error: any) {
      console.log('Error in updateQuantity: ' + error);
    } finally {
      this.closeUpdateQuantity();
    }
  }
}
