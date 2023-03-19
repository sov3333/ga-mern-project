import express from 'express';

const router = express.Router();

router.get('/test', (req, res) => {
  res.send('THIS ROUTE WORKS');
});

router.post('/', (req, res) => {
  console.log(req.body);
  res.json({ status: 'ok' });
});

export default router;
