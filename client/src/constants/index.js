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

export const featuresHow = [
  'Create a post to share a picture of your desk setup',
  `Swipe right to like other people's setups`,
  'Rate and review products curated by programmers, gamers and traders',
];

import { keyboard, screen } from '../assets/home';

export const featuresWhy = [
  {
    imgUrl: keyboard,
    title: 'Gaming',
    subtitle:
        'Need a new keyboard or mouse for your next M-M-M-M-MONSTER KILL? Our reviews by top gamers got you covered!',
  },
  {
    imgUrl: screen,
    title: 'Productivity',
    subtitle:
        'Two screens are better than one. Check out what other programmers and traders like you are recommending.',
  },
];

import { product_keyboard, product_pc, product_monitor } from '../assets/home';

export const reviews = [
  {
    imgUrl: product_keyboard,
    title: 'Glorious GMMK 2',
    subtitle:
        'The GLORIOUS GMMK 2 is an excellent keyboard for gaming. It feels very well-built, and its latency is amazing, making it suitable for any genre of gaming. All its keys are macro-programmable and individually backlit with bright RGB lighting...',
  },
  {
    imgUrl: product_pc,
    title: 'Dreamcore Custom PCs',
    subtitle:
        'Superb rig and customer service. After looking at so many custom PC build companies, chose Dreamcore as they have a solid reputation, moreover prices are one of the most competitive. They are very responsive and I highly recommend...',
  },
  {
    imgUrl: product_monitor,
    title: 'Xiaomi Curved Gaming Monitor 34',
    subtitle:
        'The Xiaomi Curved Display 34 is an excellent buy if you consider how much screen real estate and refresh rate you are getting per dollar. Its VA panel is also quite capable in color and contrast performance, plus it is robust for a budget option...',
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