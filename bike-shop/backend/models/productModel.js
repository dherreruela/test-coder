import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: ['road', 'mtb', 'city', 'electric', 'children'],
    },
    stock: { type: Number, default: 0 },
    images: [{ type: String }],
    brand: { type: String },
    specs: {
      frame: String,
      gears: Number,
      wheelSize: String,
      weight: Number,
      suspension: Boolean,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
