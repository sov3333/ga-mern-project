import express from 'express';
import user from '../mongodb/models/User.js';

const router = express.Router();

router.get('/test', async (req, res) => {
  res.send('THIS ROUTE WORKS');
});

router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const createdUser = await user.create(req.body);
    res.status(200).send(createdUser);
  } catch (error) {
    res.status(400).json({ status: 'error', error: error.message });
  }
});

export default router;
