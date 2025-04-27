import { Component, effect, Input, signal } from '@angular/core';
import { ProductDataType } from '../../types/types';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEllipsisVertical,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { AuthServices } from '../../services/auth.services';
import { AddProductService } from '../../services/add-product.service';
import { RouterLink } from '@angular/router';
import { ProductServices } from '../../services/products.service';

@Component({
  selector: 'single-product-component',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: 'single-product.component.html',
})
export class SingleProductComponent {
  @Input() productData!: ProductDataType;

  showMoreOptions = signal(false);
  confirmDelete = signal(false);

  showConfirmDelete() {
    this.confirmDelete.set(true);
  }

  confirmDeleteYes() {
    this.productService.deleteProduct(this.productData._id!);
    this.confirmDelete.set(false);
  }

  confirmDeleteNo() {
    this.confirmDelete.set(false);
  }

  toggleMoreOptions() {
    this.showMoreOptions.update((prev) => !prev);
  }

  closeMoreOptions() {
    this.showMoreOptions.set(false);
  }

  faEllipsisVertical = faEllipsisVertical;
  faTrash = faTrash;
  faPen = faPen;

  constructor(
    public authService: AuthServices,
    public addProductService: AddProductService,
    public productService: ProductServices
  ) {
    effect(() => {
      document.body.style.overflow = this.confirmDelete() ? 'hidden' : '';
    });
  }
}
