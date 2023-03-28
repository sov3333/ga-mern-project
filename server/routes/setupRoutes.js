import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import setup from '../mongodb/models/setup.js';
import requireAuth from '../auth/authMiddleware.js';

dotenv.config();
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get('/', async (req, res) => {
  try {
    const currentSetup = await setup.find({});
    res.status(200).send(currentSetup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  console.log(`hello from the /api/setup post route!`);
  // console.log(req.body);
  try {
    const { img } = req.body;
    const photoUrl = await cloudinary.uploader.upload(img);
    const newPost = {
      ...req.body,
      img: photoUrl.url,
    };

    console.log(newPost);

    const createdSetup = await setup.create(newPost);
    res.status(200).send(createdSetup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// To send the seed files to DB
// 1) comment out top router.post (line 15 to 23)
// 2) uncomment below router.post (line 31 to 72)
// 3) to save to seed to the DB => got to create page and click submit
// 4) comment line 30 to 67 out after done.
// 5) uncomment out top router.post (line 15 to 23) and save.
// router.post('/', async (req, res) => {
//   console.log(req.body);
//   try {
//     const createdSetup = await setup.create(
//       {
//         img: 'https://t3.gstatic.com/images?q=tbn:ANd9GcSTspk0HexUgLVvH7AoWUOfZ61RecRVeAaoubWnCQHmAfVY9rKB',
//         user: 'Alice',
//         title: 'Blue Battlestation',
//         description:
//           'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis delectus nihil odio.',
//         type: ['desk', 'monitor', 'keyboard', 'mouse', 'chair'],
//       },
//       {
//         img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT13ujza2Re0zLk0Vk5VviScLa1zYzu0VGxdW1igIYd63UDxtJA',
//         user: 'Bob',
//         title: 'Mellow Woods',
//         description:
//           'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis delectus nihil odio.',
//         type: ['desk', 'monitor', 'keyboard', 'mouse', 'mousepad', 'chair'],
//       },
//       {
//         img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSKdjQk306iqnHH4Ews6MqBkTkbgWIPBT0JTrC3-jgO5wWhR0ck',
//         user: 'Charlie',
//         title: 'Coding Club',
//         description:
//           'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis delectus nihil odio.',
//         type: ['desk', 'monitor', 'speaker', 'pc', 'keyboard', 'mousepad'],
//       },
//       {
//         img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ7Y3DJGIZejTxIdwspZPJhd40NKcYKHKXbGuoH7MxteDaJZJQl',
//         user: 'Delilah',
//         title: 'Autumn Dev',
//         description:
//           'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis delectus nihil odio.',
//         type: ['desk', 'monitor', 'speaker', 'mouse'],
//       }
//     );
//     res.status(200).send(createdSetup);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

//Show Route - 1 setup
router.get('/:id', async (req, res) => {
  try {
    const selectedSetup = await setup.findById(req.params.id);
    res.status(200).send(selectedSetup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Delete Route
router.delete('/:id', async (req, res) => {
  try {
    const deletedSetup = await setup.findByIdAndRemove(req.params.id);
    res.status(200).send(deletedSetup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// router.delete('/:id', requireAuth, async (req, res) => {
//   if (req.user.role === 'admin') {
//     try {
//       const { id } = req.params;

//       const deletedSetup = await setup.findByIdAndDelete(id);

//       if (!deletedSetup) {
//         return res.status(404).json({ message: 'Setup not found' });
//       }
//       res.status(204).end();
//     } catch (e) {
//       console.error(e);
//       res.status(500).json({ message: 'Server Error' });
//     }
//   } else {
//     res.status(403).json({ error: `Access Denied` });
//   }
// });

//Update Route
router.put('/:id', async (req, res) => {
  try {
    const updatedSetup = await setup.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // to return document after `update` was applied
    );
    res.status(200).send(updatedSetup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
