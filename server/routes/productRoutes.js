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

// Route to get all reviews by a specific user
//localhost:8080/api/product/Alice/reviews
router.get('/:user/reviews', async (req, res) => {
  const user = req.params.user;
  const products = await Product.find({});

  let reviews = [];
  for (let i = 0; i < products.length; i++) {
    // Retrieve all reviews for this product from the specified user
    const productReviews = products[i].reviews.filter(
      (review) => review.user === user
    );
    reviews = reviews.concat(productReviews);
  }

  if (reviews.length === 0) {
    // No reviews found for this user
    res.json({ message: 'No reviews found for this user.' });
  } else {
    // Reviews found
    res.json(reviews);
  }
});

// Route to get all reviews (rating + review) by a specific user and model
//localhost:8080/api/product/Alice/reviews/Deathadder%20V2
router.get('/:user/reviews/:model', async (req, res) => {
  const user = req.params.user;
  const model = req.params.model;

  // Find the product with the given model and the user's reviews and ratings for that product
  const product = await Product.findOne(
    {
      model: model,
      reviews: { $elemMatch: { user: user } },
      ratings: { $elemMatch: { user: user } },
    },
    {
      reviews: { $elemMatch: { user: user } },
      ratings: { $elemMatch: { user: user } },
    }
  );

  if (!product) {
    // No product found
    res.status(404).json({ message: 'Product not found.' });
  } else {
    // Review found
    const review = product.reviews[0];
    const rating = product.ratings[0];
    res.json({ user: user, review: review, rating: rating });
  }
});

// curl -X POST   -H "Content-Type: application/json"   -d '{"rating": 4, "review": "Great mouse!"}'   http://localhost:8080/api/product/Alice/reviews/Deathadder%20V2
// {"user":"Alice","review":"Great mouse!","rating":4}

// Route to add a review and rating for a specific product by model
router.post('/:user/reviews/:model', async (req, res) => {
  const user = req.params.user;
  const model = req.params.model;
  const { rating, review } = req.body;

  try {
    const product = await Product.findOneAndUpdate(
      { model: model },
      {
        $push: {
          reviews: { user: user, review: review },
          ratings: { user: user, rating: rating },
        },
      },
      { new: true }
    );

    if (!product) {
      // No product found
      res.status(404).json({ message: 'Product not found.' });
    } else {
      // Review and rating added
      const addedReview = product.reviews.find((rev) => rev.user === user);
      const addedRating = product.ratings.find((rat) => rat.user === user);
      res.json({
        user: user,
        review: addedReview.review,
        rating: addedRating.rating,
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// curl -X PUT -H "Content-Type: application/json" -d '{"rating": 1, "review": "NO good!"}' http://localhost:8080/api/product/Alice/reviews/Deathadder%20V2

// Route to update a review and rating for a specific product by model
router.put('/:user/reviews/:model', async (req, res) => {
  const user = req.params.user;
  const model = req.params.model;
  const { rating, review } = req.body;

  try {
    const product = await Product.findOneAndUpdate(
      {
        model: model,
        reviews: { $elemMatch: { user: user } },
        ratings: { $elemMatch: { user: user } },
      },
      { $set: { 'reviews.$.review': review, 'ratings.$.rating': rating } },
      { new: true }
    );

    if (!product) {
      // No product found
      res.status(404).json({ message: 'Product not found.' });
    } else {
      // Review and rating updated
      const updatedReview = product.reviews.find((rev) => rev.user === user);
      const updatedRating = product.ratings.find((rat) => rat.user === user);
      res.json({
        user: user,
        review: updatedReview.review,
        rating: updatedRating.rating,
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// curl -X DELETE http://localhost:8080/api/product/Alice/reviews/Deathadder%20V2 -d '{"user": "Alice"}' -H "Content-Type: application/json"

// Route to delete a review and rating for a specific product by model
router.delete('/:user/reviews/:model', async (req, res) => {
  const user = req.params.user;
  const model = req.params.model;

  try {
    const product = await Product.findOneAndUpdate(
      { model: model },
      { $pull: { reviews: { user: user }, ratings: { user: user } } },
      { new: true }
    );

    if (!product) {
      // No product found
      res.status(404).json({ message: 'Product not found.' });
    } else {
      // Review and rating deleted
      res.json({ message: 'Review and rating deleted.' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

//Post for create.jsx

router.post('/', async (req, res) => {
  try {
    const { user, img, type, brand, model, ratings, reviews } = req.body;

    const newProduct = new Product({
      user,
      img,
      type,
      brand,
      model,
      ratings,
      reviews,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ newProduct: savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
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
      {
        user: 'Bob',
        img: 'https://lh3.googleusercontent.com/T0U0k8tsnwhXkA0gyb7to3loVVTlXXjFCe2RbpeBcu2FE9FSXzS4_-Phe9YrgAB-Co6_FIZtuf1FKdtURbtssiE4RzGiR8rTutiFW1oY',
        type: 'Monitor',
        brand: 'Xiaomi',
        model: 'Curved Gaming Monitor 34',
        ratings: [{ user: 'Bob', rating: 4 }],
        reviews: { user: 'Bob', review: 'This is a great Monitor!' },
      },
      {
        user: 'Daniel',
        img: 'https://lh3.googleusercontent.com/T0U0k8tsnwhXkA0gyb7to3loVVTlXXjFCe2RbpeBcu2FE9FSXzS4_-Phe9YrgAB-Co6_FIZtuf1FKdtURbtssiE4RzGiR8rTutiFW1oY',
        type: 'Monitor',
        brand: 'Xiaomi',
        model: 'Curved Gaming Monitor 34',
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
