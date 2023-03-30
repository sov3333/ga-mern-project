import express from 'express';
import Product from '../mongodb/models/product.js';
import setup from '../mongodb/models/setup.js';

const router = express.Router();

//Setup Seed Database

//Post
// curl -X POST localhost:8080/api/seed/setups
router.post('/setups', async (req, res) => {
  console.log(req.body);
  try {
    const createdSetup = await setup.create(
      {
        img: 'https://t3.gstatic.com/images?q=tbn:ANd9GcSTspk0HexUgLVvH7AoWUOfZ61RecRVeAaoubWnCQHmAfVY9rKB',
        userId: '1',
        user: 'Alice',
        title: 'Blue Battlestation',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis delectus nihil odio.',
        products: [
          {
            type: 'Desk',
            brand: 'Omnidesk',
            model: 'Ascent Wildwood+',
          },
          {
            type: 'Monitor',
            brand: 'Xiaomi',
            model: 'Curved Gaming Monitor 34',
          },
          {
            type: 'Mouse',
            brand: 'Razer',
            model: 'DeathAdder V2',
          },
          {
            type: 'Keyboard',
            brand: 'Razer',
            model: 'BlackWidow V4 Pro',
          },
        ],
        swipes: [
          {
            userId: '23423',
            liked: true,
          },
        ],
      },
      {
        img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT13ujza2Re0zLk0Vk5VviScLa1zYzu0VGxdW1igIYd63UDxtJA',
        userId: '131232',
        user: 'Bob',
        title: 'Mellow Woods',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis delectus nihil odio.',
        products: [
          {
            type: 'mouse',
            brand: 'Razer',
            model: 'Deathadder V2',
          },

          {
            type: 'mousepad',
            brand: 'Aukey',
            model: 'KM-P2 Large Gaming Mouse Pad Oversized',
          },
          {
            type: 'chair',
            brand: 'Logitech X Herman Miller',
            model: 'Embody gaming chair',
          },
          {
            type: 'light',
            brand: 'Type 75 Desk Lamp Paul Smith',
            model: 'Edition 6',
          },
        ],
        swipes: [
          {
            userId: '1',
            liked: true,
          },
        ],
      },
      {
        img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSKdjQk306iqnHH4Ews6MqBkTkbgWIPBT0JTrC3-jgO5wWhR0ck',
        userId: '13131',
        user: 'Charlie',
        title: 'Coding Club',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis delectus nihil odio.',
        products: [
          {
            type: 'monitor',
            brand: 'Xiaomi',
            model: 'Curved Gaming Monitor 34',
          },
          {
            type: 'mousepad',
            brand: 'Aukey',
            model: 'KM-P2 Large Gaming Mouse Pad Oversized',
          },
          {
            type: 'chair',
            brand: 'Logitech X Herman Miller',
            model: 'Embody gaming chair',
          },
          {
            type: 'light',
            brand: 'Type 75 Desk Lamp Paul Smith',
            model: 'Edition 6',
          },
        ],
        swipes: [
          {
            userId: '131232',
            liked: true,
          },
          {
            userId: '4234',
            liked: true,
          },
        ],
      },
      {
        img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ7Y3DJGIZejTxIdwspZPJhd40NKcYKHKXbGuoH7MxteDaJZJQl',
        userId: '4234',
        user: 'Delilah',
        title: 'Autumn Dev',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis delectus nihil odio.',
        products: [
          {
            type: 'monitor',
            brand: 'Gigabyte',
            model: 'M34WQ',
          },
          {
            type: 'mousepad',
            brand: 'Aukey',
            model: 'KM-P2 Large Gaming Mouse Pad Oversized',
          },
          {
            type: 'chair',
            brand: 'Logitech X Herman Miller',
            model: 'Embody gaming chair',
          },
          {
            type: 'light',
            brand: 'Type 75 Desk Lamp Paul Smith',
            model: 'Edition 6',
          },
          {
            type: 'speaker',
            brand: 'Audioengine',
            model: 'Audioengine A2+ Wireless White',
          },
        ],
        swipes: [
          {
            userId: '131232',
            liked: false,
          },
          {
            userId: '1',
            liked: true,
          },
        ],
      }
    );
    res.status(200).send(createdSetup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Prdouct Seed Database

//Post
// curl -X POST localhost:8080/api/seed/products

router.post('/products', async (req, res) => {
  try {
    const createdProduct = await Product.create([
      {
        user: 'Alice',
        img: 'https://assets.hardwarezone.com/img/2021/11/omnidesk.jpg',
        type: 'Desk',
        brand: 'Omnidesk',
        model: 'Ascent Wildwood+',
        title: 'Adjustable Height Standing Desk',
        description:
          'The Omnidesk Ascent Wildwood+ is a height-adjustable desk with a solid wood desktop and a sturdy steel frame.',
        features: [
          { name: 'Height-adjustable' },
          { name: 'Sturdy construction' },
          { name: 'Cable management' },
          { name: 'Memory settings' },
          { name: 'LED lighting' },
          { name: 'Wireless charging' },
          { name: 'USB ports' },
          { name: 'Eco-friendly' },
        ],
        specifications: [
          { name: 'Desktop material', stat: 'Solid wood' },
          { name: 'Desktop dimensions', stat: '120cm x 60cm' },
          { name: 'Height range', stat: '63cm - 128cm' },
          { name: 'Weight capacity', stat: '120kg' },
          { name: 'Frame material', stat: 'Steel' },
          { name: 'Frame color', stat: 'Black' },
        ],
        ratings: [
          {
            user: 'Alice',
            rating: 4,
            review:
              "I love this desk! It's very sturdy and looks great in my home office.",
          },
        ],
      },
      {
        user: 'Alice',
        img: 'https://assets.hardwarezone.com/img/2019/10/xiaomi-mi-surface.jpg',
        type: 'Monitor',
        brand: 'Xiaomi',
        model: 'Curved Gaming Monitor 34',
        title: 'Ultra-Wide 1440p Gaming Monitor',
        description:
          'The Xiaomi Curved Gaming Monitor 34 is an ultra-wide gaming monitor with a resolution of 1440p, a 144Hz refresh rate, and FreeSync technology.',
        features: [
          { name: '34-inch curved display' },
          { name: '1440p resolution' },
          { name: '144Hz refresh rate' },
          { name: 'FreeSync technology' },
          { name: '4ms response time' },
          { name: 'HDR10 support' },
          { name: 'Multiple ports (HDMI, DisplayPort)' },
          { name: 'Adjustable stand' },
        ],
        specifications: [
          { name: 'Display size', stat: '34 inches' },
          { name: 'Resolution', stat: '3440 x 1440' },
          { name: 'Refresh rate', stat: '144Hz' },
          { name: 'Response time', stat: '4ms' },
          { name: 'Brightness', stat: '300 cd/m²' },
          { name: 'Contrast ratio', stat: '3000:1' },
          { name: 'Color gamut', stat: 'sRGB 121%, DCI-P3 85%' },
          { name: 'Ports', stat: '2 x HDMI, 2 x DisplayPort' },
          { name: 'Dimensions', stat: '810 x 520 x 250 mm' },
          { name: 'Weight', stat: '7.2 kg' },
        ],
        ratings: [
          {
            user: 'Alice',
            rating: 5,
            review:
              'The Xiaomi Curved Gaming Monitor 34 is amazing. The picture quality is stunning and the curved design really immerses you in the game.',
          },
        ],
      },
      {
        user: 'Alice',
        img: 'https://press.razer.com/wp-content/uploads/2020/01/DAV2_1-1024x576.png',
        type: 'Mouse',
        brand: 'Razer',
        model: 'DeathAdder V2',
        title: 'Ergonomic Wired Gaming Mouse',
        description:
          'The Razer DeathAdder V2 is an ergonomic wired gaming mouse designed for high-performance gaming.',
        features: [
          { name: 'Ergonomic design' },
          { name: 'High-precision sensor' },
          { name: 'Customizable RGB lighting' },
          { name: 'Programmable buttons' },
          { name: 'On-board memory' },
          { name: 'Razer Chroma' },
          { name: 'Speedflex cable' },
        ],
        specifications: [
          { name: 'Sensor', stat: 'Razer Focus+ Optical Sensor' },
          { name: 'Sensitivity', stat: '20,000 DPI' },
          { name: 'Acceleration', stat: '650 IPS / 50G' },
          { name: 'Buttons', stat: '8 programmable buttons' },
          { name: 'Polling Rate', stat: '1000 Hz' },
          { name: 'Cable Length', stat: '2.1 meters' },
          { name: 'Weight', stat: '82g' },
        ],
        ratings: [
          {
            user: 'Alice',
            rating: 5,
            review:
              "This is the best gaming mouse I've ever used. The precision is amazing and the customizable lighting is a nice touch.",
          },
        ],
      },
      {
        user: 'Alice',
        img: 'https://assets2.razerzone.com/images/pnx.assets/d493370b21999f3f6d72904ecff2b682/razer-blackwidow-v4-pro-wrist-rest-1920x700.jpg',
        type: 'Keyboard',
        brand: 'Razer',
        model: 'BlackWidow V4 Pro',
        title: 'Mechanical Gaming Keyboard',
        description:
          "The Razer BlackWidow V4 Pro is a premium mechanical gaming keyboard featuring Razer's Green mechanical switches and Chroma RGB lighting.",
        features: [
          { name: 'Razer Green mechanical switches' },
          { name: 'Chroma RGB lighting' },
          { name: 'Ergonomic wrist rest' },
          { name: 'Magnetic media dock with USB passthrough' },
          { name: 'Fully programmable keys with on-board memory' },
        ],
        specifications: [
          { name: 'Switch type', stat: 'Razer Green mechanical switches' },
          { name: 'Keycaps', stat: 'Doubleshot ABS' },
          { name: 'Lighting', stat: 'Razer Chroma RGB' },
          { name: 'Connectivity', stat: 'Wired, USB Type-C' },
          { name: 'Cable length', stat: '6.0 ft / 1.8 m' },
        ],
        ratings: [
          { user: 'Alice', rating: 4, review: 'Great keyboard for gaming!' },
        ],
      },
      {
        user: 'Bob',
        img: 'https://assets.hardwarezone.com/img/2019/10/xiaomi-mi-surface.jpg',
        type: 'Monitor',
        brand: 'Xiaomi',
        model: 'Curved Gaming Monitor 34',
        title: 'Gaming Monitor',
        description:
          'A high-performance curved gaming monitor with a 144Hz refresh rate and AMD FreeSync technology.',
        features: [
          { name: '34-inch curved display' },
          { name: '144Hz refresh rate' },
          { name: 'AMD FreeSync technology' },
        ],
        specifications: [
          { name: 'Display size', stat: '34 inches' },
          { name: 'Resolution', stat: '3440 x 1440' },
          { name: 'Refresh rate', stat: '144Hz' },
          { name: 'Response time', stat: '4ms' },
        ],
        ratings: [
          {
            user: 'Bob',
            rating: 3,
            review: 'Nice monitor',
          },
        ],
      },
      {
        user: 'Bob',
        img: 'https://press.razer.com/wp-content/uploads/2020/01/DAV2_1-1024x576.png',
        type: 'Mouse',
        brand: 'Razer',
        model: 'DeathAdder V2',
        title: 'Best Gaming Mouse',
        description:
          'The Razer DeathAdder V2 is a high-precision gaming mouse with a focus on speed and accuracy.',
        features: [
          { name: '20,000 DPI optical sensor' },
          { name: '8 programmable buttons' },
          { name: 'Chroma RGB lighting' },
        ],
        specifications: [
          { name: 'Sensor', stat: 'Razer Focus+ Optical Sensor' },
          { name: 'DPI', stat: '20,000 DPI' },
          { name: 'Speed', stat: '650 IPS' },
          { name: 'Acceleration', stat: '50 G' },
          { name: 'Polling rate', stat: '1000Hz' },
        ],
        ratings: [
          {
            user: 'Bob',
            rating: 4,
            review: 'Good Product!',
          },
        ],
      },
      {
        user: 'Lindsey',
        img: 'https://assets2.razerzone.com/images/pnx.assets/d493370b21999f3f6d72904ecff2b682/razer-blackwidow-v4-pro-wrist-rest-1920x700.jpg',
        type: 'Keyboard',
        brand: 'Razer',
        model: 'BlackWidow V4 Pro',
        title: 'Best Gaming Keyboard',
        description:
          'The Razer BlackWidow V4 Pro is a mechanical gaming keyboard with Razer Chroma RGB lighting and wireless connectivity.',
        features: [
          { name: 'Mechanical switches' },
          { name: 'Wireless connectivity' },
          { name: 'Customizable Chroma RGB lighting' },
        ],
        specifications: [
          {
            name: 'Keys',
            stat: 'Fully programmable keys with on-the-fly macro recording',
          },
          { name: 'Lighting', stat: 'Customizable Chroma RGB lighting' },
          {
            name: 'Battery life',
            stat: 'Up to 200 hours with backlighting off',
          },
          { name: 'Dimensions', stat: '463mm x 174mm x 36mm' },
          { name: 'Weight', stat: '1.95kg' },
        ],
        ratings: [
          {
            user: 'Lindsey',
            rating: 5,
            review:
              'I absolutely love this keyboard! The mechanical switches feel great and the wireless connectivity is so convenient. Plus, the Chroma RGB lighting looks amazing. I highly recommend it!',
          },
        ],
      },
      {
        user: 'Lindsey',
        img: 'https://assets.hardwarezone.com/img/2019/10/xiaomi-mi-surface.jpg',
        type: 'Monitor',
        brand: 'Xiaomi',
        model: 'Curved Gaming Monitor 34',
        title: 'Gaming Monitor 34',
        description:
          'The Xiaomi Curved Gaming Monitor 34 is a 34-inch curved ultrawide gaming monitor with a high refresh rate and QHD resolution.',
        features: [
          { name: '34-inch curved ultrawide display' },
          { name: '144Hz refresh rate' },
          { name: 'AMD FreeSync technology' },
        ],
        specifications: [
          { name: 'Screen size', stat: '34 inches' },
          { name: 'Resolution', stat: '3440 x 1440 (QHD)' },
          { name: 'Aspect ratio', stat: '21:9' },
          { name: 'Refresh rate', stat: '144Hz' },
          { name: 'Response time', stat: '1ms' },
          { name: 'Color gamut', stat: 'sRGB 121%' },
          { name: 'Contrast ratio', stat: '3000:1' },
          { name: 'Brightness', stat: '300 cd/m²' },
        ],
        ratings: [
          {
            user: 'Lindsey',
            rating: 3,
            review:
              "This monmes look ae colors aren't quite as accurate as I would like, but it's still a great monitor overall.",
          },
        ],
      },
    ]);
    res.status(200).send(createdProduct);
  } catch (e) {
    console.log(e);
  }
});
export default router;
