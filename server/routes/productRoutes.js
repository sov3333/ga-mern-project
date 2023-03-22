import express from 'express';
import Product from '../mongodb/models/product.js';

const router = express.Router();

//Get
//http://localhost:8080/api/product

router.get('/', async (req, res) => {
  try {
    const currentProduct = await Product.find({});
    res.status(200).json(currentProduct);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Server Error' });
  }
});

//Get
// http://localhost:8080/api/product/Keyboard (search by type)
router.get('/:type', async (req, res) => {
  try {
    const { type } = req.params;

    const product = await Product.findOne({ type });

    if (!product) {
      return res.status(404).json({ message: 'Product type not found' });
    }

    res.json(product);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

//Post
// curl -X POST localhost:8080/api/product/seed

router.post('/seed', async (req, res) => {
  try {
    const createdProduct = await Product.create([
      {
        type: 'Desk',
        brand: 'Omnidesk',
        model: 'Ascent Wildwood+',
        ratings: [
          { user: 'Alice', rating: 4 },
          { user: 'Bob', rating: 5 },
        ],
        reviews: { user: 'Alice', review: 'This is a great Desk!' },
      },
      {
        type: 'Keyboard',
        brand: 'Keychron',
        model: 'K4',
        ratings: [{ user: 'Lindsey', rating: 4 }],
        reviews: { user: 'Lindsey', review: 'This keyboard is awesome!' },
      },
    ]);
    res.status(200).send(createdProduct);
  } catch (e) {
    console.log(e);
  }
});

//Put
//curl -X PUT -H "Content-Type: application/json" -d '{"brand":"NewBrand", "model":"NewModel",
// "ratings":[{"user":"John","rating":4.5}], "reviews":[{"user":"Jane","review":"This is a great product"}]}' http://localhost:8080/api/product/Keyboard

router.put('/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const { brand, model, ratings, reviews } = req.body;

    const updatedProduct = await Product.findOneAndUpdate(
      { type },
      { brand, model, ratings, reviews },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product type not found' });
    }

    res.json(updatedProduct);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

//Delete
//curl -X DELETE http://localhost:8080/api/product/Desk

router.delete('/:type', async (req, res) => {
  try {
    const { type } = req.params;

    const deletedProduct = await Product.findOneAndDelete({ type });

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product type not found' });
    }

    res.json(deletedProduct);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;
//Testing
