import express from 'express';
import * as dotenv from 'dotenv';
import Product from '../mongodb/models/Product.js';
import setup from '../mongodb/models/setup.js';

dotenv.config();

const router = express.Router();

//SETUP routes

// Get
// http://localhost:8080/api/test/setup

router.get('/setup/', async (req, res) => {
  try {
    const setups = await setup.Setup.find({});
    res.status(200).json(setups);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server Error' });
  }
});

// post
// curl -X POST localhost:8080/api/test/setup/seed

router.post('/setup/seed/', async (req, res) => {
  try {
    const newSetups = await setup.Setup.create([
      {
        img: 'https://t3.gstatic.com/images?q=tbn:ANd9GcSTspk0HexUgLVvH7AoWUOfZ61RecRVeAaoubWnCQHmAfVY9rKB',
        user: 'Alice',
        products: ['Desk', 'Monitor', 'Keyboard', 'Mouse', 'Chair'],
      },
      {
        img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT13ujza2Re0zLk0Vk5VviScLa1zYzu0VGxdW1igIYd63UDxtJA',
        user: 'Bob',
        products: ['Desk', 'Monitor', 'Keyboard', 'Mouse', 'Mousepad', 'Chair'],
      },
      {
        img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSKdjQk306iqnHH4Ews6MqBkTkbgWIPBT0JTrC3-jgO5wWhR0ck',
        user: 'Charlie',
        products: ['Desk', 'Monitor', 'Speaker', 'PC', 'Keyboard', 'Mousepad'],
      },
      {
        img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ7Y3DJGIZejTxIdwspZPJhd40NKcYKHKXbGuoH7MxteDaJZJQl',
        user: 'Delilah',
        products: ['Desk', 'Monitor', 'Monitor', 'Speaker', 'Mouse'],
      },
      {
        img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTNQpmQeZUnFRTl08aJyEAcAFNuNeLFo_yIIWDWWMWFWntKSgW5',
        user: 'Evangeline',
        products: ['Desk', 'Monitor', 'Keyboard', 'Light', 'Chair'],
      },
      {
        img: 'https://t0.gstatic.com/images?q=tbn:ANd9GcSBqgFAhWHHmMrpUzXS4amR8ZfqCa0_oAbyJd8t0SBczgfCyV4O',
        user: 'Frodo',
        products: ['Laptop', 'Monitor', 'Light', 'Riser', 'Keyboard'],
      },
    ]);
    console.log(newSetups);
    res.redirect('/');
  } catch (e) {
    console.log(e);
  }
});

//Put

router.put('/setup/:user/', async (req, res) => {
  const { user } = req.params;
  const { img, products } = req.body;

  try {
    const setup = await setup.Setup.findOne({ user });

    if (!setup) {
      return res.status(404).json({ message: 'Setup not found' });
    }

    setup.img = img;
    setup.products = products;

    const updatedSetup = await setup.save();

    res.json(updatedSetup);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete

router.delete('/setup/:user/', async (req, res) => {
  const { user } = req.params;

  try {
    const setup = await setup.Setup.findOneAndDelete({ user });

    if (!setup) {
      return res.status(404).json({ message: 'Setup not found' });
    }

    res.json({ message: 'Setup deleted' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server Error' });
  }
});

//Products routes

// Get
// http://localhost:8080/api/test/product
router.get('/product/', async (req, res) => {
  try {
    const products = await Product.Product.find({});
    res.status(200).json(products);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server Error' });
  }
});

//Post
//curl -X POST localhost:8080/api/test/product/seed

router.post('/product/seed/', async (req, res) => {
  try {
    const newProducts = await Product.Product.create([
      {
        type: 'Desk',
        brand: 'Omnidesk',
        model: 'Ascent Wildwood+',
      },
      {
        type: 'Keyboard',
        brand: 'Keychron',
        model: 'K4',
      },
      {
        type: 'Mouse',
        brand: 'Razer',
        model: 'Deathadder V2',
      },
      {
        type: 'Monitor',
        brand: 'Xiaomi',
        model: 'Curved Gaming Monitor 34',
      },
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
    ]);
    console.log(newProducts);
    res.redirect('/');
  } catch (e) {
    console.log(e);
  }
});

export default router;
