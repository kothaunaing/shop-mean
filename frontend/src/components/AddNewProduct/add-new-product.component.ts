import { Component, Input, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AddProductService } from '../../services/add-product.service';
import { ProductDataType } from '../../types/types';
import { ProductServices } from '../../services/products.service';

@Component({
  selector: 'add-new-product-component',
  templateUrl: 'add-new-product.component.html',
  imports: [FontAwesomeModule],
})
export class AddNewProductComponent {
  errorMessage = signal('');
  addingProduct = signal(false);
  constructor(
    public addProductService: AddProductService,
    private productService: ProductServices
  ) {}

  faAdd = faAdd;
  faXMark = faXmark;

  async addNewProduct(event: any, data: any) {
    event.preventDefault();
    if (!data.name.trim()) {
      this.errorMessage.set('Name is a required field');
      return;
    }
    if (!data.price) {
      this.errorMessage.set('Price is a required field');
      return;
    }
    if (!data.image.trim()) {
      this.errorMessage.set('Image is a required field');
      return;
    }

    this.addingProduct.set(true);
    await this.productService.addProduct(data);
    this.addingProduct.set(false);
    this.addProductService.closeNewProductForm();
  }
}
