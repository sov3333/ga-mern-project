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

// Route to get all reviews for a specific brand
router.get('/:brand/reviews', async (req, res) => {
  const brand = req.params.brand;
  const products = await Product.find({ brand: brand });

  if (products.length === 0) {
    // No products found for this brand
    res.send('No reviews found for this brand.');
  } else {
    let reviews = [];
    for (let i = 0; i < products.length; i++) {
      // Retrieve all reviews for this product
      reviews = reviews.concat(products[i].reviews);
    }

    if (reviews.length === 0) {
      // No reviews found for this brand
      res.send('No reviews found for this brand.');
    } else {
      // Reviews found, show "Update Review" button for each review
      let response = '';
      for (let i = 0; i < reviews.length; i++) {
        response += `Review found. <button>Update Review (ID: ${reviews[i]._id})</button><br>`;
      }
      res.send(response);
    }
  }
});

// Route to add or update a review for a specific product by model
router.post('/:brand/reviews', async (req, res) => {
  const brand = req.params.brand;
  const reviewText = req.body.reviewText;

  try {
    // Find product with matching model
    const product = await Product.findOne({ brand });

    if (!product) {
      // No product found with matching model
      res.send('No product found with matching brand.');
    } else {
      // Check if a review exists for this product
      const existingReview = product.reviews.find(
        (review) => review.user === req.user
      );

      if (existingReview) {
        // Update existing review
        existingReview.review = reviewText;
        await product.save();
        res.send('Review updated.');
      } else {
        // Create new review
        product.reviews.push({ user: req.user, review: reviewText });
        await product.save();
        res.send('Review added.');
      }
    }
  } catch (e) {
    // Error occurred, send error message
    res.send(`Error: ${error.message}`);
  }
});

//Get on the ratings and reviews
// http://localhost:8080/api/product/Keyboard (search by type)

router.get('/:type', async (req, res) => {
  try {
    const { type } = req.params;

    const product = await Product.findOne({ type }, { ratings: 1, reviews: 1 });

    if (!product) {
      return res.status(404).json({ message: 'Product type not found' });
    }

    res.json({ ratings: product.ratings, reviews: product.reviews });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

//Post a new review
// curl -X POST -H "Content-Type: application/json" -d '{"user":"John","review":"This product is awesome!"}' http://localhost:8080/api/product/:type/reviews

router.post('/:type/reviews', async (req, res) => {
  try {
    const { type } = req.params;
    const { user, review } = req.body;

    const updatedProduct = await Product.findOneAndUpdate(
      { type },
      { $push: { reviews: { user, review } } },
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

//Post
// curl -X POST localhost:8080/api/product/seed

router.post('/seed', async (req, res) => {
  try {
    const createdProduct = await Product.create([
      {
        user: 'Alice',
        img: 'https://assets.hardwarezone.com/img/2021/11/omnidesk.jpg',
        type: 'Desk',
        brand: 'Omnidesk',
        model: 'Ascent Wildwood+',
        ratings: [{ user: 'Alice', rating: 4 }],
        reviews: { user: 'Alice', review: 'This is a great Desk!' },
      },
      {
        user: 'Lindsey',
        img: 'https://press.razer.com/wp-content/uploads/2020/01/DAV2_1-1024x576.png',
        type: 'Mouse',
        brand: 'Razer',
        model: 'Deathadder V2',
        ratings: [{ user: 'Lindsey', rating: 4 }],
        reviews: [{ user: 'Lindsey', review: 'This great product' }],
      },
      {
        user: 'Alice',
        img: 'https://press.razer.com/wp-content/uploads/2020/01/DAV2_1-1024x576.png',
        type: 'Mouse',
        brand: 'Razer',
        model: 'Deathadder V2',
        ratings: [{ user: 'Alice', rating: 4 }],
        reviews: [{ user: 'Alice', review: 'This great product' }],
      },
      {
        user: 'Daniel',
        img: 'https://press.razer.com/wp-content/uploads/2020/01/DAV2_1-1024x576.png',
        type: 'Mouse',
        brand: 'Razer',
        model: 'Deathadder V2',
        ratings: [{ user: 'Daniel', rating: 1 }],
        reviews: [{ user: 'Daniel', review: 'Not good!' }],
      },
    ]);
    res.status(200).send(createdProduct);
  } catch (e) {
    console.log(e);
  }
});

//Put
//curl -X PUT -H "Content-Type: application/json" -d
//'{"ratings":[{"user":"John","rating":4.5}],"reviews":[{"user":"Jane","review":"This is a great product"}]}' http://localhost:8080/api/product/Keyboard

router.put('/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const { ratings, reviews } = req.body;

    const updatedProduct = await Product.findOneAndUpdate(
      { type },
      { ratings, reviews },
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
