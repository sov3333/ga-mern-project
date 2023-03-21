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
  } catch (error) {
    res.status(400).json({ status: 'error', error: error.message });
  }
});

export default router;
