import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AddProductService } from '../../services/add-product.service';

@Component({
  selector: 'update-product-component',
  templateUrl: 'update-product.component.html',
  imports: [FontAwesomeModule],
})
export class UpdateProductComponent {
  constructor(public addProductService: AddProductService) {}

  faAdd = faAdd;
  faXMark = faXmark;

  changeValue() {
    console.log(this.addProductService.updateProduct);
  }
}
