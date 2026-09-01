import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import Product from './models/productModel.js';
import products from './data/products.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'BikeShop API is running' });
});

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bike-shop';
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

/**
 * Seed default products on first boot (when the collection is empty).
 * This avoids having to run `npm run seed` manually after each deployment.
 */
const seedProductsIfEmpty = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(products);
      console.log(`Seeded ${products.length} default products`);
    } else {
      console.log(`Products already present (${count}), skipping seed`);
    }
  } catch (err) {
    console.error('Error seeding products:', err.message);
  }
};

const PORT = process.env.PORT || 5000;

connectDB()
  .then(async () => {
    await seedProductsIfEmpty();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to start server:', err.message);
    process.exit(1);
});

