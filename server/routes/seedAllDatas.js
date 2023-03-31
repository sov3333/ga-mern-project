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
        img: 'http://res.cloudinary.com/duxgfcrbs/image/upload/v1680237837/sgwtdk5fmgjesmovbsxi.png',
        userId: '123123456',
        user: 'Flowstate',
        title: 'Mellow Dreams',
        description:
          'This is my setup for dual-purpose setup for gaming and programming. I love keeping my desk clean to help with my productivitiy.',
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
          {
            userId: '234231',
            liked: true,
          },
          {
            userId: '234232',
            liked: false,
          },
        ],
      },
      {
        img: 'http://res.cloudinary.com/duxgfcrbs/image/upload/v1680237824/dwsxflmj3a1regylc1dl.png',
        userId: '234234234',
        user: 'Gamer2359',
        title: 'Alien Green',
        description:
          'At the corner of my gaming cave, I love my neon-lit gadgets as I play through the nights and weekends.',
        products: [
          {
            type: 'Desk',
            brand: 'IKEA',
            model: 'UTESPELARE Gaming Desk Black',
          },
          {
            type: 'Monitor',
            brand: 'BenQ',
            model: 'XL2411',
          },
          {
            type: 'Mouse',
            brand: 'Logitch',
            model: 'Gaming 304',
          },
          {
            type: 'Keyboard',
            brand: 'Razer',
            model: 'G915 Lightspeed',
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
        img: 'http://res.cloudinary.com/duxgfcrbs/image/upload/v1680237608/kjimfwu4q2ktjpezo2do.png',
        userId: '345345345',
        user: 'TraderJoe',
        title: 'Need Moar Screens',
        description:
          'I use 3 widescreens and also 2 projectors on my window blinds. No just kidding, this was made with midjourney. Looks quite productive tho huh!',
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
            type: 'Monitor',
            brand: 'Gigabyte',
            model: 'MW34Q',
          },
          {
            type: 'Monitor',
            brand: 'Gigabyte',
            model: 'MW34Q',
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
        img: 'http://res.cloudinary.com/duxgfcrbs/image/upload/v1680237916/zdgdny7xa0vepcyvdfyu.png',
        userId: '1',
        user: 'Dinosaurus',
        title: 'Blast from the Past',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis delectus nihil odio.',
        products: [
          {
            type: 'Desk',
            brand: 'Omnidesk',
            model: 'Ascent Wildwood+',
          },
          {
            type: 'Typewriter',
            brand: 'Hermes',
            model: '3000',
          },
        ],
        swipes: [],
      },
      {
        img: 'http://res.cloudinary.com/duxgfcrbs/image/upload/v1680241692/s3xiat7rhiundyunlgwm.jpg',
        userId: '1',
        user: 'relodebell',
        title: 'Neon Rain',
        description:
          'My programming and gaming setup. Recently became a fan of the vertical monitor which is useful for working on code. Hope you like it!',
        products: [
          {
            type: 'Keyboard',
            brand: 'SteelSeries',
            model: 'Apex Pro Mechanical Gaming Keyboard',
          },
          {
            type: 'Mouse',
            brand: 'Asus',
            model: 'ROG Gladius III',
          },
          {
            type: 'Monitor',
            brand: 'BenQ',
            model: 'XL28W',
          },
          {
            type: 'Monitor',
            brand: 'Acer',
            model: 'Gaming Monitor 32"',
          },
        ],
        swipes: [],
      },
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
            type: 'Mouse',
            brand: 'Razer',
            model: 'Deathadder V2',
          },

          {
            type: 'Mousepad',
            brand: 'Aukey',
            model: 'KM-P2 Large Gaming Mouse Pad Oversized',
          },
          {
            type: 'Chair',
            brand: 'Logitech X Herman Miller',
            model: 'Embody gaming chair',
          },
          {
            type: 'Light',
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
            type: 'Monitor',
            brand: 'Xiaomi',
            model: 'Curved Gaming Monitor 34',
          },
          {
            type: 'Mousepad',
            brand: 'Aukey',
            model: 'KM-P2 Large Gaming Mouse Pad Oversized',
          },
          {
            type: 'Chair',
            brand: 'Logitech X Herman Miller',
            model: 'Embody gaming chair',
          },
          {
            type: 'Light',
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
            type: 'Monitor',
            brand: 'Gigabyte',
            model: 'M34WQ',
          },
          {
            type: 'Mousepad',
            brand: 'Aukey',
            model: 'KM-P2 Large Gaming Mouse Pad Oversized',
          },
          {
            type: 'Chair',
            brand: 'Logitech X Herman Miller',
            model: 'Embody gaming chair',
          },
          {
            type: 'Light',
            brand: 'Type 75 Desk Lamp Paul Smith',
            model: 'Edition 6',
          },
          {
            type: 'Speaker',
            brand: 'Audioengine',
            model: 'Audioengine A2+ Wireless White',
          },
        ],
        swipes: [],
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
        img: 'https://res.cloudinary.com/duxgfcrbs/image/upload/v1680239143/foekt8hunq89mteusmdw.jpg',
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
        img: 'https://res.cloudinary.com/duxgfcrbs/image/upload/v1680239172/rhuuu0vaqumk3ytoc6db.jpg',
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
            user: 'Delilah',
            rating: 5,
            review:
              'The Xiaomi Curved Gaming Monitor 34 is amazing. The picture quality is stunning and the curved design really immerses you in the game.',
          },
          {
            user: 'Gamer2359',
            rating: 4,
            review:
              'Colors are a bit off sometimes, but otherwise extremely good value, definitely will recommend!',
          },
          {
            user: 'TraderXBT',
            rating: 5,
            review:
              'I use two of these stacked above each other for my setup. Great value for money and quality is great for this price point.',
          },
        ],
      },
      {
        img: 'https://res.cloudinary.com/duxgfcrbs/image/upload/v1680239199/i6joaws6oxeaccbbhasy.webp',
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
        ratings: [],
      },
      {
        img: 'https://res.cloudinary.com/duxgfcrbs/image/upload/v1680239222/gzza8d883xjezrbkwaf6.jpg',
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
        img: 'https://res.cloudinary.com/duxgfcrbs/image/upload/v1680239354/h7dfyz5y6d3tvxbtk3c3.jpg',
        type: 'Monitor',
        brand: 'Gigabyte',
        model: 'G34WQC Gaming Monitor',
        title: 'The Last Mile for your Gaming System',
        description:
          'The streamline appearance represents the simplicity of the GIGABYTE gaming series design philosophy, sturdy stand and matte finish built for functional and aesthetic features adding more to the characteristics.',
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
            rating: 4,
            review: 'Nice monitor',
          },
          {
            user: 'Gamer2359',
            rating: 3,
            review: 'Great quality and affordable',
          },
        ],
      },
      {
        img: 'http://res.cloudinary.com/duxgfcrbs/image/upload/v1680239860/gx2fdio8xfq9dkragkki.jpg',
        type: 'Mouse',
        brand: 'Logitech',
        model: 'Gaming 304',
        title: 'Lightspeed Wireless Gaming Mouse',
        description:
          'Logitech G304 is a LIGHTSPEED wireless gaming mouse designed for serious performance with the latest technology, HERO sensor is the next-gen optical gaming sensor from Logitech G. In wireless gaming, there can be no compromises.',
        features: [
          { name: '20,000 DPI optical sensor' },
          { name: '8 programmable buttons' },
          { name: 'Chroma RGB lighting' },
        ],
        specifications: [
          { name: 'Colors', stat: 'White or Black' },
          { name: 'Sensor', stat: 'Razer Focus+ Optical Sensor' },
          { name: 'DPI', stat: '20,000 DPI' },
          { name: 'Speed', stat: '650 IPS' },
          { name: 'Acceleration', stat: '50 G' },
          { name: 'Polling rate', stat: '1000Hz' },
        ],
        ratings: [
          {
            user: 'MouseConnoisseur',
            rating: 4,
            review: 'It is reliable and dependable especially when gaming. Even though this mouse is an entry-level lightspeed mouse, Logitech G304 Lightspeed feels well-built and comparable to the premium wireless mice that Logitech has in the market right now. The only thing you are missing out on when buying this mouse is the bling, the G304 has no RGB lighting to save battery life.',
          },
          {
            user: 'JaniceTheManice',
            rating: 3,
            review: 'Not very responsive sometimes!! :(',
          },
        ],
      },
      {
        img: 'http://res.cloudinary.com/duxgfcrbs/image/upload/v1680240344/szieomrt0wadsaxmjng4.jpg',
        type: 'Light',
        brand: 'Angelpoise',
        model: 'Type 75 desk lamp, Paul Smith Edition 6',
        title: 'Classic, Minimalist Expression and Functional Design',
        description:
          'The Type 75 Paul Smith Edition is defined by a bright multi-colour palette in matte finishes. The colours were created by the renowned British designer Paul Smith inspired by the abstract Dutch art movement De Stijl.',
        features: [
          { name: 'Rotating, rounded shade' },
          { name: 'Adjustable arm with spring tension system' },
          { name: 'Aluminium arm' },
          { name: 'Cast iron base' },
        ],
        specifications: [
          {
            name: 'Material',
            stat: 'Matt painted aluminium, cast iron base',
          },
          { name: 'Colour', stat: 'Pink, Paul Smith stripes' },
          { name: 'Length', stat: '71 cm' },
          { name: 'Width', stat: '14.5 cm' },
          { name: 'Shade diameter', stat: '14.5 cm' },
          { name: 'Height', stat: '90 cm' },
          { name: 'Bulb base', stat: 'E27' },
          { name: 'Cable colour', stat: 'Black' },
          { name: 'Cable material', stat: 'Textile' },
        ],
        ratings: [
          {
            user: 'NurshaCodes',
            rating: 5,
            review:
              'Exceeded my expectations in every way! The great design fits well on my desk and really helps me while I code through the nights!',
          },
        ],
      },
      {
        img: 'http://res.cloudinary.com/duxgfcrbs/image/upload/v1680240672/a7zsaplkzjjflex3myvg.jpg',
        type: 'Chair',
        brand: 'Logitech X Herman Miller',
        model: 'Embody Gaming Chair',
        title: 'Play Advanced',
        description:
          'The Embody Gaming Chair from Herman Miller and Logitech G features science-backed ergonomics and is designed to keep you comfortable and cool.',
        features: [
          { name: 'Fully Adjustable Arms' },
          { name: 'PostureFit® Spinal Support' },
          { name: 'Adjustable Seat Depth' },
          { name: 'Tilt Limiter' },
          { name: 'Hard Floor/Carpet Wheels' },
          { name: 'No Assembly Required' },
          { name: 'Cooling Foam' },
        ],
        specifications: [
          { name: 'Total Height', stat: '1067-1143 mm' },
          { name: 'Width', stat: '749 mm' },
          { name: 'Depth', stat: '381-457 mm' },
          { name: 'Seat Height', stat: '432-559 mm' },
          { name: 'Distance from Seat to Armrest', stat: '165-290 mm' },
          { name: 'Maximum Warrantied Weight', stat: '136 kg' },
        ],
        ratings: [
          {
            user: 'GearLab',
            rating: 5,
            review:
              "The Herman Miller Embody scores exceptionally well in our tests and is a premium office chair. It's incredibly comfortable and you can easily sit in it for a century!",
          },
          {
            user: 'Dwiargo',
            rating: 4,
            review:
              "There are a few twists for extra comfort for long gaming sessions. But ultimately, the Embody is a very expensive, very comfortable gaming chair.",
          },
        ],
      },
      {
        img: 'http://res.cloudinary.com/duxgfcrbs/image/upload/v1680240662/tyf4dkkmmc2ameteoo6a.webp',
        type: 'Speaker',
        brand: 'Audioengine',
        model: 'A2+ Wireless White',
        title: 'Small Speakers Big Sound',
        description:
          'The Audioengine A2+ premium powered speakers with high-fidelity stereo sound connects to your music in seconds from any app or device. The ultimate Bluetooth mini home music system that’s perfect for your desktop or smaller spaces.',
        features: [
          { name: 'No hassle setup' },
          { name: 'Easy to use' },
          { name: 'Wireless Bluetooth' },
        ],
        specifications: [
          { name: 'Amplifier type', stat: 'Dual class AB monolithic' },
          { name: 'Inputs', stat: '3.5mm stereo mini-jack, RCA, USB, Bluetooth' },
          { name: 'Outputs', stat: 'RCA variable line-out' },
          { name: 'Connector type', stat: 'Micro USB' },
          { name: 'Shipping weight', stat: '4.6kg/10lbs per pair' },
          { name: 'Shipping box dimensions', stat: '10.5” (H) x 15” (L) x 7” (W)' },
        ],
        ratings: [
          {
            user: 'SoundByte',
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
