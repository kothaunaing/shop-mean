import { Injectable, signal } from '@angular/core';
import axios from 'axios';
import { getTokenAndReturnHeader } from '../utils/getTokenAndReturnHeader';
import { CartItemsResponseType } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItemsCount: number | null = 0;
  apiUrl = 'http://localhost:5000/api/cart';
  addingToCart = signal(false);
  loadingCartItems = signal(false);
  cartItems: CartItemsResponseType | null = null;

  async getCartItemsCount() {
    try {
      const res = await axios.get(this.apiUrl + '/count', {
        withCredentials: true,
        headers: getTokenAndReturnHeader('token'),
      });

      this.cartItemsCount = res.data.count;

      // console.log(res.data);
    } catch (error: any) {
      console.log('Error in getCartItems: ' + error.message);
    }
  }

  async getAllCartItems(page: number = 1) {
    try {
      const pageQuery = `?page=${page}`;
      this.loadingCartItems.set(true);
      const res = await axios.get(
        this.apiUrl + '/get-all' + pageQuery,

        {
          withCredentials: true,
          headers: getTokenAndReturnHeader('token'),
        }
      );

      this.cartItems = res.data;
    } catch (error: any) {
      console.log('Error in getCartItems: ' + error.message);
    } finally {
      this.loadingCartItems.set(false);
    }
  }

  async addToCart(productId: string, quantity: string) {
    try {
      this.addingToCart.set(true);
      const res = await axios.post(
        this.apiUrl + '/add',
        { productId, quantity },
        {
          withCredentials: true,
          headers: getTokenAndReturnHeader('token'),
        }
      );

      this.cartItemsCount = this.cartItemsCount! + parseInt(quantity);

      console.log(res.data);
    } catch (error: any) {
      console.log('Error in getCartItems: ' + error.message);
    } finally {
      this.addingToCart.set(false);
    }
  }
}
