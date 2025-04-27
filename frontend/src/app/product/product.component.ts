import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  productId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
  }
}
