import express from 'express';
import setup from '../mongodb/models/setup.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const currentSetup = await setup.find({});
    res.status(200).send(currentSetup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const createdSetup = await setup.create(req.body);
    res.status(200).send(createdSetup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// To send the seed files to DB
// 1) comment out top router.post (line 15 to 23)
// 2) uncomment below router.post (line 30 to 67)
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
//         products: ['desk', 'monitor', 'keyboard', 'mouse', 'chair'],
//       },
//       {
//         img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT13ujza2Re0zLk0Vk5VviScLa1zYzu0VGxdW1igIYd63UDxtJA',
//         user: 'Bob',
//         title: 'Mellow Woods',
//         description:
//           'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis delectus nihil odio.',
//         products: ['desk', 'monitor', 'keyboard', 'mouse', 'mousepad', 'chair'],
//       },
//       {
//         img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSKdjQk306iqnHH4Ews6MqBkTkbgWIPBT0JTrC3-jgO5wWhR0ck',
//         user: 'Charlie',
//         title: 'Coding Club',
//         description:
//           'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis delectus nihil odio.',
//         products: ['desk', 'monitor', 'speaker', 'pc', 'keyboard', 'mousepad'],
//       },
//       {
//         img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ7Y3DJGIZejTxIdwspZPJhd40NKcYKHKXbGuoH7MxteDaJZJQl',
//         user: 'Delilah',
//         title: 'Autumn Dev',
//         description:
//           'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis delectus nihil odio.',
//         products: ['desk', 'monitor', 'speaker', 'mouse'],
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

//Update Route
router.put('/:id', async (req, res) => {
  try {
    const updatedSetup = await setup.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send(updatedSetup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
