import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AddProductService } from '../../services/add-product.service';

@Component({
  selector: 'add-new-product-component',
  templateUrl: 'add-new-product.component.html',
  imports: [FontAwesomeModule],
})
export class AddNewProductComponent {
  constructor(public addProductService: AddProductService) {}

  faAdd = faAdd;
  faXMark = faXmark;
}
