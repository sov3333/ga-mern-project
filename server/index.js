import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';

import connectDB from './mongodb/connect.js';
import testRoutes from './routes/testRoutes.js';
import userRoute from './routes/user.js';
import requireAuth from './auth/authMiddleware.js';

import setupRoutes from './routes/setupRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use('/api/test', testRoutes);
app.use('/api/user', userRoute);
app.use('/api/setup', setupRoutes);
app.use('/api/product', productRoutes);

const PORT = process.env.PORT || 8080;
const MONGODB_URL =
  process.env.MONGODB_URL || 'mongodb://localhost:27017/swipes';

app.get('/', async (req, res) => {
  res.send('Server says hello!');
});

const startServer = async () => {
  try {
    connectDB(MONGODB_URL);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
