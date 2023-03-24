export const exampleArray = [
  'Example X',
  'Example Y',
  'Example Z',
];

import { setup1, setup2, setup3, setup4, setup5, setup6 } from '../assets/setups';
import { product1, product2, product3, product4, product5, product6 } from '../assets/products';

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
  { productId: 4, img: product4, type: "Monitor", brand: "Xiaomi", model: "Curved Gaming Monitor 34" },
  { productId: 5, img: product5, type: "Monitor", brand: "Gigabyte", model: "M34WQ" },
  { productId: 6, img: product6, type: "Mousepad", brand: "Aukey", model: "KM-P2 Large Gaming Mouse Pad Oversized" },
];

import { setup_01, setup_02, setup_03, setup_04, setup_05 } from '../assets/home';

export const exploreSetups = [
  {
    id: 'setup-1',
    imgUrl: setup_01,
    name: 'Alice',
    title: `A Trader's Paradise`,
  },
  {
    id: 'setup-2',
    imgUrl: setup_02,
    name: 'Bob',
    title: 'Neon Alien',
  },
  {
    id: 'setup-3',
    imgUrl: setup_03,
    name: 'Charlie',
    title: 'Mellow Glow',
  },
  {
    id: 'setup-4',
    imgUrl: setup_04,
    name: 'Delilah',
    title: `I'm from the Future`,
  },
  {
    id: 'setup-5',
    imgUrl: setup_05,
    name: 'Evangeline',
    title: 'Blast from the Past',
  },
];

export const startingFeatures = [
  'Find a world that suits you and you want to enter',
  'Enter the world by reading basmalah to be safe',
  'No need to beat around the bush, just stay on the gas and have fun',
];

export const newFeatures = [
  {
    imgUrl: '/vrpano.svg',
    title: 'A new world',
    subtitle:
        'we have the latest update with new world for you to try never mind',
  },
  {
    imgUrl: '/headset.svg',
    title: 'More realistic',
    subtitle:
        'In the latest update, your eyes are narrow, making the world more realistic than ever',
  },
];

export const insights = [
  {
    imgUrl: '/planet-06.png',
    title: 'The launch of the Metaverse makes Elon musk ketar-ketir',
    subtitle:
        'Magna etiam tempor orci eu lobortis elementum nibh tellus molestie. Diam maecenas sed enim ut sem viverra alique.',
  },
  {
    imgUrl: '/planet-07.png',
    title: '7 tips to easily master the madness of the Metaverse',
    subtitle:
        'Vitae congue eu consequat ac felis donec. Et magnis dis parturient montes nascetur ridiculus mus. Convallis tellus id interdum',
  },
  {
    imgUrl: '/planet-08.png',
    title: 'With one platform you can explore the whole world virtually',
    subtitle:
        'Quam quisque id diam vel quam elementum. Viverra nam libero justo laoreet sit amet cursus sit. Mauris in aliquam sem',
  },
];

export const socials = [
  {
    name: 'twitter',
    url: '/twitter.svg',
  },
  {
    name: 'linkedin',
    url: '/linkedin.svg',
  },
  {
    name: 'instagram',
    url: '/instagram.svg',
  },
  {
    name: 'facebook',
    url: '/facebook.svg',
  },
];