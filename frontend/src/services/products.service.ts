import { Injectable, signal } from '@angular/core';
import { ProductDataType } from '../types/types';
import axios from 'axios';
import { getTokenAndReturnHeader } from '../utils/getTokenAndReturnHeader';

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
  query: string = '';

  async searchProducts(page: number = 1, query: string = '') {
    try {
      const searchQuery = `?query=${query}`;
      const pageQuery = `&page=${page}`;

      this.loadingProducts.set(true);
      const res: any = await axios.get(
        this.apiUrl + '/search' + searchQuery + pageQuery,
        {
          withCredentials: true,
          headers: getTokenAndReturnHeader('token'),
        }
      );
      this.productsData = res.data;
      console.log(res.data);
    } catch (error: any) {
      console.log('Error in searchProducts: ' + error.message);
    } finally {
      this.loadingProducts.set(false);
    }
  }

  async fetchAllProducts(page: number = 2) {
    try {
      const pageQuery = `?page=${page}`;
      this.loadingProducts.set(true);
      const res: any = await axios.get(this.apiUrl + '/get-all' + pageQuery, {
        withCredentials: true,
        headers: getTokenAndReturnHeader('token'),
      });
      this.productsData = res.data;
      // console.log(res.data);
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
          headers: getTokenAndReturnHeader('key'),
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
        headers: getTokenAndReturnHeader('token'),
      });

      this.productsData!.products.push(res.data.product);
    } catch (error: any) {
      console.log('Error in addProduct: ' + error.message);
    }
  }

  async updateProduct(data: any) {
    const token = sessionStorage.getItem('token');
    const res: any = await axios.put(
      this.apiUrl + '/update/' + data._id,
      data,
      {
        withCredentials: true,
        headers: getTokenAndReturnHeader('key'),
      }
    );

    const updatedProduct = res.data.product;

    const newProducts = this.productsData?.products?.map((product) => {
      if (product._id === data._id) {
        return updatedProduct;
      } else {
        return product;
      }
    }) as ProductDataType[];

    this.productsData!.products = newProducts;
  }
}
