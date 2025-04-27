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

  async deleteProduct(productId: string) {
    try {
      const res: any = await axios.delete(
        this.apiUrl + '/delete/' + productId,
        {
          withCredentials: true,
        }
      );
      const newProducts = this.productsData?.products?.filter(
        (product) => product._id !== productId
      ) as ProductDataType[];
      this.productsData!.products = newProducts;
    } catch (error: any) {
      console.log('Error in deleteProduct: ' + error.message);
    }
  }

  async addProduct(data: any) {
    try {
      const res: any = await axios.post(this.apiUrl + '/new/', data, {
        withCredentials: true,
      });

      this.productsData!.products.push(res.data.product);
    } catch (error: any) {
      console.log('Error in addProduct: ' + error.message);
    }
  }

  async updateProduct(data: any) {
    const res: any = await axios.put(
      this.apiUrl + '/update/' + data._id,
      data,
      {
        withCredentials: true,
      }
    );

    const updatedProduct = res.data.product;

    const newProducts = this.productsData?.products.map((product) => {
      if (product._id === data._id) {
        return updatedProduct;
      }
    }) as ProductDataType[];

    this.productsData!.products = newProducts;
  }
}
