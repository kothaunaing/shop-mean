import { Injectable, signal } from '@angular/core';
import { ProductDataType } from '../types/types';
import axios from 'axios';

interface ProductsData {
  currentPage: number;
  itemsInCurrentPage: number;
  itemsPerPage: number;
  msg: string;
  products: ProductDataType[];
  success: boolean;
  totalPages: number;
  totalProducts: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductServices {
  apiUrl = 'http://localhost:5000/api/product';
  productsData: ProductsData | null = null;
  loadingProducts = signal(false);

  async fetchAllProducts(page: number = 2) {
    try {
      const pageQuery = `?page=${page}`;
      this.loadingProducts.set(true);
      const res: any = await axios.get(this.apiUrl + '/get-all' + pageQuery, {
        withCredentials: true,
      });
      this.productsData = res.data;
      console.log(res.data);
    } catch (error: any) {
      console.log('Error in fetchAllProducts: ' + error.message);
    } finally {
      this.loadingProducts.set(false);
    }
  }
}
