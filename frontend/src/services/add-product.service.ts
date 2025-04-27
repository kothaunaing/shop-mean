import { effect, Injectable, signal } from '@angular/core';
import { ProductDataType } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class AddProductService {
  updateProduct!: ProductDataType | null;
  creatingNewProduct = signal(false);
  updatingProduct = signal(false);

  constructor() {
    effect(() => {
      document.body.style.overflow =
        this.creatingNewProduct() || this.updatingProduct() ? 'hidden' : '';
    });
  }

  openNewProductForm() {
    this.creatingNewProduct.set(true);
  }

  closeNewProductForm() {
    this.creatingNewProduct.set(false);
  }

  openUpdatingProduct(data: ProductDataType) {
    this.updatingProduct.set(true);
    this.updateProduct = data;
  }

  closeUpdatingProduct() {
    this.updatingProduct.set(false);
    this.updateProduct = null;
  }
}
