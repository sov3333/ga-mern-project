import express from 'express';
import * as dotenv from 'dotenv';
import Product from '../mongodb/models/product.js';
import setup from '../mongodb/models/setup.js';

dotenv.config();

const router = express.Router();

//Get
router.get('/setup', async (req, res) => {
  try {
    const setups = await setup.Setup.find({});
    res.status(200).json(setups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// post
//curl -X POST localhost:8080/api/test/seed to test seed
router.post('/setup/seed', async (req, res) => {
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
router.put('/setup/:user', async (req, res) => {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

//delete
// Delete
router.delete('/setup/:user', async (req, res) => {
  const { user } = req.params;

  try {
    const setup = await setup.Setup.findOneAndDelete({ user });

    if (!setup) {
      return res.status(404).json({ message: 'Setup not found' });
    }

    res.json({ message: 'Setup deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST
// router.route('/').post(async (req, res) => {
//   try {
//     const { name } = req.body
//     const newPost = await Post.create({
//       name: name,
//     })
//     res.status(201).json({ success: true, data: newPost })
//   } catch (error) {
//     res.status(500).json({ success: false, message: error })
//   }
// })

// PUT
// router.route('/:id').put(async (req, res) => {
//   try {
//     const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     })
//     console.log(`Updated Post:`, updatedPost)
//     res.status(201).json({ success: true, data: updatedPost })
//   } catch (error) {
//     res.status(500).json({ success: false, message: error })
//   }
// })

// DELETE
// router.route('/:id').delete(async (req, res) => {
//   try {
//     const removedPost = await Post.findByIdAndRemove(req.params.id)
//     console.log(`Removed Post:`, removedPost)
//     res.status(201).json({ success: true, data: removedPost })
//   } catch (error) {
//     res.status(500).json({ success: false, message: error })
//   }
// })

export default router;
