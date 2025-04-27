import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AddProductService } from '../../services/add-product.service';
import { ProductServices } from '../../services/products.service';

@Component({
  selector: 'update-product-component',
  templateUrl: 'update-product.component.html',
  imports: [FontAwesomeModule],
})
export class UpdateProductComponent {
  errorMessage = signal('');
  updatingProduct = signal(false);
  constructor(
    public addProductService: AddProductService,
    private productService: ProductServices
  ) {}

  faAdd = faAdd;
  faXMark = faXmark;

  changeValue() {
    console.log(this.addProductService.updateProduct);
  }

  async updateProduct(event: any, data: any) {
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

    try {
      this.updatingProduct.set(true);
      await this.productService.updateProduct(data);
      this.addProductService.closeUpdatingProduct();
    } catch (error: any) {
      console.log(error);
    } finally {
      this.updatingProduct.set(false);
    }
  }
}
