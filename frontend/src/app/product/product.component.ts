import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDataType } from '../../types/types';
import axios from 'axios';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  apiUrl = 'http://localhost:5000/api/product';
  productId: string | null = null;
  product: ProductDataType | null = null;
  loadingProduct = signal(false);

  constructor(private route: ActivatedRoute) {}

  async fetchAProduct() {
    const token = sessionStorage.getItem('token');
    try {
      this.loadingProduct.set(true);
      const res: any = await axios.get(this.apiUrl + '/get/' + this.productId, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.product = res.data.product;
      console.log(res.data);
    } catch (error: any) {
      console.log('Error in fetchAlProduct: ' + error.message);
    } finally {
      this.loadingProduct.set(false);
    }
  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.fetchAProduct();
  }
}
