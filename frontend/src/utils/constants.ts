export const shippingTypes = [
  {
    id: 1,
    date: Date.now() + 1000 * 60 * 60 * 24 * 10,
    name: 'Free Shipping',
    price: 0,
  },
  {
    id: 2,
    date: Date.now() + 1000 * 60 * 60 * 24 * 6,
    name: '$4.99 - Shipping',
    price: 499,
  },
  {
    id: 3,
    date: Date.now() + 1000 * 60 * 60 * 24 * 1,
    name: '$9.99 - Shipping',
    price: 999,
  },
];

export const baseApiUrl = 'http://localhost:5000/api';
