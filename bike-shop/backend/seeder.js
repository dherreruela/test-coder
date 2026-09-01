import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import products from './data/products.js';

dotenv.config();

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bike-shop');
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Data imported');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error.message);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bike-shop');
    await Product.deleteMany();
    console.log('Data destroyed');
    process.exit();
  } catch (error) {
    console.error('Error destroying data:', error.message);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
