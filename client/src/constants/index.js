export const exampleArray = [
  'Example X',
  'Example Y',
  'Example Z',
];

import { setup1, setup2, setup3, setup4, setup5, setup6 } from '../assets/setups';
import { product1, product2, product3 } from '../assets/products';

export const setupsData = [
  { setupId: 1, img: setup1, user: 'Alice', heading: 'Blue Battlestation', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis delectus nihil odio.', products: ['desk', 'monitor', 'keyboard', 'mouse', 'chair'] },
  { setupId: 2, img: setup2, user: 'Bob', heading: 'Mellow Woods', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis delectus nihil odio.', products: ['desk', 'monitor', 'keyboard', 'mouse', 'mousepad', 'chair'] },
  { setupId: 3, img: setup3, user: 'Charlie', heading: 'Coding Club', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis delectus nihil odio.', products: ['desk', 'monitor', 'speaker', 'pc', 'keyboard', 'mousepad'] },
  { setupId: 4, img: setup4, user: 'Delilah', heading: 'Autumn Dev', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis delectus nihil odio.', products: ['desk', 'monitor', 'monitor', 'headphone', 'light'] },
  { setupId: 5, img: setup5, user: 'Evangeline', heading: 'Black & White', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis delectus nihil odio.', products: ['desk', 'monitor', 'speaker', 'keyboard', 'chair'] },
  { setupId: 6, img: setup6, user: 'Frodo', heading: 'Sky Blue Light', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis delectus nihil odio.', products: ['laptop', 'monitor', 'light', 'riser', 'keyboard'] },
];

export const productsData = [
  { productId: 1, img: product1, type: "Desk", brand: "Omnidesk", model: "Ascent Wildwood+" },
  { productId: 2, img: product2, type: "Keyboard", brand: "Keychron", model: "K4" },
  { productId: 3, img: product3, type: "Mouse", brand: "Razer", model: "Deathadder V2" },
];
