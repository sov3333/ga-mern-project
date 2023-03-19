export const exampleArray = [
  'Example X',
  'Example Y',
  'Example Z',
];

import { setup1, setup2, setup3, setup4, setup5, setup6 } from '../assets/setups';
import { product1, product2, product3 } from '../assets/products';

export const setupsData = [
  { setupId: 1, img: setup1, user: 'Alice', heading: 'Blue Battlestation', description: '', products: ['desk', 'keyboard'] },
  { setupId: 2, img: setup2, user: 'Bob', heading: 'Mellow Woods', description: '', products: ['mouse', 'mousepad'] },
  { setupId: 3, img: setup3, user: 'Charlie', heading: 'Coding Club', description: '', products: ['monitor', 'speaker'] },
  { setupId: 4, img: setup4, user: 'Delilah', heading: 'Autumn Dev', description: '', products: ['headphone', 'light'] },
  { setupId: 5, img: setup5, user: 'Evangeline', heading: 'Black & White', description: '', products: ['desktop', 'monitor'] },
  { setupId: 6, img: setup6, user: 'Frodo', heading: 'Sky Blue Light', description: '', products: ['laptop', 'accessories'] },
];

export const productsData = [
  { productId: 1, img: product1, type: "Desk", brand: "Omnidesk", model: "Ascent Wildwood+" },
  { productId: 2, img: product2, type: "Keyboard", brand: "Keychron", model: "K4" },
  { productId: 3, img: product3, type: "Mouse", brand: "Razer", model: "Deathadder V2" },
];
