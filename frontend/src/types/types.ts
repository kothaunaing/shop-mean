export interface CreateUserType {
  name: string;
  username: string;
  email: string;
  password: string;
  role?: string;
}

export interface LoginUserType {
  email: string;
  password: string;
}

export type CurrentUserType = Omit<CreateUserType, 'password'> & {
  createdAt: string;
  updatedAt: string;
};

export interface ProductDataType {
  _id?: string;
  updatedAt?: string;
  createdAt?: string;
  name: string;
  price: number;
  discount?: number;
  description?: string;
  image: string;
}

export interface SingleCartItem {
  _id: string;
  cart: string;
  createdAt: string;
  product: ProductDataType;
  quantity: number;
  updatedAt: string;
}

export interface CartItemsResponseType {
  cartItems: SingleCartItem[];
  items: number;
  totalItems: number;
  itemsPerPage: 10;
  msg: string;
  page: number;
  success: boolean;
  totalPages: number;
}
