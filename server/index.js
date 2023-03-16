import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import methodOverride from 'method-override';

import connectDB from './mongodb/connect.js';
import testRoutes from './routes/testRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(methodOverride("_method"));
app.use('/api/test', testRoutes);

const PORT = process.env.PORT || 8080;
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/starter";

app.get('/', async (req, res) => {
    res.send("Server says hello!");
});

const startServer = async () => {
    try {
        connectDB(MONGODB_URL);
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

startServer();
