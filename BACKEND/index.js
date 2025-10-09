import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3000;

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(cors());

try {
  await mongoose.connect('mongodb+srv://mrsaku26:practice@cluster0.kejy0mm.mongodb.net/practice');
} catch (error) {
  console.error(error);
}

// Multer setup
const storage = multer.diskStorage({
  destination: './Upload/images',
  filename(req, file, cb) {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

app.use('/images', express.static(path.join(__dirname, 'Upload/images')));

// Upload endpoint
app.post('/upload', upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Product schema
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

const Products = mongoose.model('Product', productSchema);

// Add product
app.post('/addproduct', async (req, res) => {
  try {
    const products = await Products.find({});
    const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const product = new Products({
      id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    await product.save();
    res.json({ success: true, name: req.body.name });
  } catch (error) {
    console.error(error);
  }
});

// Delete product
app.post('/deleteproduct', async (req, res) => {
  await Products.findOneAndDelete({ id: req.body.id });
  res.json({ success: true, name: req.body.name });
});

// Get all products
app.get('/allproduct', async (req, res) => {
  const products = await Products.find({});
  res.send(products);
});

// User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  cartData: Object,
  date: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

// Signup
app.post('/signup', async (req, res) => {
  const check = await User.findOne({ email: req.body.email });
  if (check) return res.status(400).json({ success: false });

  const cart = {};
  for (let i = 0; i <= 300; i++) cart[i] = 0;

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();
  const token = jwt.sign({ user: { id: user._id } }, 'secret');
  res.json({ success: true, token });
});

// Login
app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.json({ success: false, error: 'Wrong Email id' });

    if (req.body.password !== user.password) {
      return res.json({ success: false, error: 'Wrong Password' });
    }

    const token = jwt.sign({ user: { id: user._id } }, 'secret');
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
  }
});

// New collection
app.get('/newcollection', async (req, res) => {
  const find = await Products.find({});
  const newcollection = find.slice(1).slice(-8);
  res.send(newcollection);
});

// Popular in women
app.get('/popularinwomen', async (req, res) => {
  const find = await Products.find({ category: 'women' });
  const popular = find.slice(0, 4);
  res.send(popular);
});

// Auth middleware
const checkUser = async (req, res, next) => {
  const token = req.header('user-token');
  if (!token) return res.status(401).send({ error: 'Please enter valid token' });

  try {
    const data = jwt.verify(token, 'secret');
    req.user = data.user;
    next();
  } catch (error) {
    console.error(error);
  }
};

// Add to cart
app.post('/addtocart', checkUser, async (req, res) => {
  const userData = await User.findById(req.user.id);
  userData.cartData[req.body.itemid] += 1;
  await User.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
  res.json({ success: true });
});

// Remove from cart
app.post('/removetocart', checkUser, async (req, res) => {
  const userData = await User.findById(req.user.id);
  if (userData.cartData[req.body.itemid] > 0) {
    userData.cartData[req.body.itemid] -= 1;
    await User.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
  }
  res.json({ success: true });
});

// Get cart data
app.post('/getcartdata', checkUser, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.cartData);
});

// Root
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;