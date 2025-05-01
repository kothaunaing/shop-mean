import { Injectable, signal } from '@angular/core';
import axios from 'axios';
import { getTokenAndReturnHeader } from '../utils/getTokenAndReturnHeader';
import { CartItemsResponseType, SingleCartItem } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItemsCount: number | null = 0;
  apiUrl = 'http://localhost:5000/api/cart';
  addingToCart = signal(false);
  loadingCartItems = signal(false);
  cartItems: CartItemsResponseType | null = null;

  constructor() {}

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
      console.log(res.data);
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

  async deleteCartItem(cartItem: SingleCartItem) {
    try {
      const res = await axios.delete(`${this.apiUrl}/delete/${cartItem._id}`, {
        headers: getTokenAndReturnHeader('token'),
      });

      const newItems = this.cartItems?.cartItems?.filter((item) => {
        return item._id !== cartItem._id;
      });

      this.cartItems!.cartItems = newItems as SingleCartItem[];
      this.cartItemsCount! -= cartItem.quantity;
    } catch (error: any) {
      console.log('Error in deleteCart: ' + error);
    }
  }

  async updateCartQuantity(
    id: string,
    quantity: string,
    originalQuantity: number
  ) {
    try {
      const res = await axios.put(
        `${this.apiUrl}/update-quantity/${id}`,
        { newQuantity: parseInt(quantity) },
        {
          headers: getTokenAndReturnHeader('token'),
        }
      );

      // console.log(res.data);

      const result = parseInt(quantity) - originalQuantity;

      this.cartItemsCount! += result;

      const newItems = this.cartItems?.cartItems?.map((item) => {
        return item._id === id ? res.data.cartItem : item;
      });

      this.cartItems!.cartItems = newItems as SingleCartItem[];
    } catch (error: any) {
      console.log('Error in deleteCart: ' + error);
    }
  }
}
