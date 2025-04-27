import { Component, effect, Input, signal } from '@angular/core';
import { ProductDataType } from '../../types/types';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEllipsisVertical,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { AuthServices } from '../../services/auth.services';
import { UpdateProductComponent } from '../UpdateProduct/update-product.component';
import { AddProductService } from '../../services/add-product.service';

@Component({
  selector: 'single-product-component',
  imports: [FontAwesomeModule, UpdateProductComponent],
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
    // yesfun
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
    public addProductService: AddProductService
  ) {
    effect(() => {
      document.body.style.overflow = this.confirmDelete() ? 'hidden' : '';
    });
  }
}
