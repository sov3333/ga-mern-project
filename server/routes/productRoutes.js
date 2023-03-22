import express from 'express';
import Product from '../mongodb/models/product.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const currentProduct = await Product.find({});
    res.status(200).send(currentProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const createdProduct = await Product.create(req.body);
    res.status(200).send(createdProduct);
  } catch (error) {
    res.status(400).json({ status: 'error', error: error.message });
  }
});

export default router;
