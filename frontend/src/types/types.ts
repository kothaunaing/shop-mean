export interface CreateUserType {
  _id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role?: string;
  isOnline?: boolean;
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
  deliveryOption: number;
}

export interface CartItemsResponseType {
  cartItems: SingleCartItem[];
  items: number;
  totalItems: number;
  itemsPerPage: number;
  msg: string;
  page: number;
  success: boolean;
  totalPages: number;
}

export interface AllUserResponseType {
  users: CreateUserType[];
  items: number;
  totalUsers: number;
  itemsPerPage: number;
  msg: string;
  page: number;
  success: boolean;
  totalPages: number;
}

export interface OnlineUserType {
  isOnline: boolean;
  userId: string;
  lastOnline: string;
}
