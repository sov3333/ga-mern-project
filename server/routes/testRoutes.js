import express from 'express';
import * as dotenv from 'dotenv';
import Product from '../mongodb/models/product.js';
import Setup from '../mongodb/models/setup.js';

dotenv.config();

const router = express.Router();

//SETUP routes

// Get
// http://localhost:8080/api/test/setup

router.get('/setup', async (req, res) => {
  try {
    const showSetups = await Setup.find({});
    res.status(200).json(showSetups);
  } catch (e) {
    console.error(e);
    const showSetups = await Setup.find({});
    res.status(200).json(showSetups);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server Error' });
  }
});

// post
// curl -X POST localhost:8080/api/test/setup/seed

router.post('/setup/seed', async (req, res) => {
  try {
    const newSetups = await Setup.create([
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
// curl -X PUT -H "Content-Type: application/json" -d '{"img":"new-image.jpg",
//"products":["product1","product2"]}' http://localhost:8080/api/test/setup/Bob

router.put('/setup/:user', async (req, res) => {
  try {
    const { user } = req.params;
    const { img, products } = req.body;

    const updatedSetup = await Setup.findOneAndUpdate(
      { user },
      { img, products },
      { new: true }
    );

    if (!updatedSetup) {
      return res.status(404).json({ message: 'Setup not found' });
    }

    res.json(updatedSetup);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Delete
//curl -X DELETE http://localhost:8080/api/test/setup/Bob

router.delete('/setup/:user', async (req, res) => {
  const { user } = req.params;

  try {
    const setup = await Setup.findOneAndDelete({ user });

    if (!setup) {
      return res.status(404).json({ message: 'Setup not found' });
    }

    res.json({ message: 'Setup deleted' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server Error' });
  }
});

//PRODUCT routes

// Get
// http://localhost:8080/api/test/product
router.get('/product/', async (req, res) => {
  try {
    const products = await Product.find({});
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
    const newProducts = await Product.create([
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

//Put
//curl -X PUT -H "Content-Type: application/json" -d '{"brand":"newBrand",
//"model":"newModel"}' http://localhost:8080/api/test/product/6419ee84b5c3db7c7aecff03

router.put('/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, brand, model } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { type, brand, model },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

//Delete
//curl -X DELETE http://localhost:8080/api/test/product/6419ee84b5c3db7c7aecff03
router.delete('/product/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
