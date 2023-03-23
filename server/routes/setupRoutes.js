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
