const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const cors = require('cors');

app.use(express.json());
app.use(cors());

// MongoDB Connection
try {
  mongoose.connect('mongodb+srv://mrsaku26:practice@cluster0.kejy0mm.mongodb.net/practice');
} catch (error) {
  console.error(error);
}

// Multer Setup
const storage = multer.diskStorage({
  destination: './Upload/images',
  filename(req, file, cb) {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });
app.use('/images', express.static('Upload/images'));

// Image Upload Endpoint
app.post('/upload', upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  });
});

// Product Schema
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  avilable: { type: Boolean, default: true },
});
const Products = mongoose.model('Product', productSchema);

// Add Product
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
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete Product
app.post('/deleteproduct', async (req, res) => {
  try {
    await Products.findOneAndDelete({ id: req.body.id });
    res.json({ success: true, name: req.body.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get All Products
app.get('/allproduct', async (req, res) => {
  try {
    const products = await Products.find({});
    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User Schema
const Users = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  cartData: Object,
  date: { type: Date, default: Date.now },
});
const User = mongoose.model('User', Users);

// Signup
app.post('/signup', async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Signup Failed' });
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.json({ success: false, error: 'Wrong Email id' });

    const passCompare = req.body.password === user.password;
    if (!passCompare) return res.json({ success: false, error: 'Wrong Password' });

    const token = jwt.sign({ user: { id: user._id } }, 'secret');
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login Failed' });
  }
});

// New Collection
app.get('/newcollection', async (req, res) => {
  try {
    const find = await Products.find({});
    const newcollection = find.slice(1).slice(-8);
    res.send(newcollection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch new collection' });
  }
});

// Popular in Women
app.get('/popularinwomen', async (req, res) => {
  try {
    const find = await Products.find({ category: 'women' });
    const popular = find.slice(0).slice(4);
    res.send(popular);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch popular items' });
  }
});

// Middleware: Check User
const checkUser = async (req, res, next) => {
  const token = req.header('user-token');
  if (!token) return res.status(401).send({ error: 'Please enter valid token' });

  try {
    const data = jwt.verify(token, 'secret');
    req.user = data.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Token verification failed' });
  }
};

// Add to Cart
app.post('/addtocart', checkUser, async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemid] += 1;
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Add to cart failed' });
  }
});

// Remove from Cart
app.post('/removetocart', checkUser, async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemid] > 0) {
      userData.cartData[req.body.itemid] -= 1;
      await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    }
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Remove from cart failed' });
  }
});

// Get Cart Data
app.post('/getcartdata', checkUser, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    res.json(user.cartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch cart data' });
  }
});

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Local vs Vercel
if (process.env.NODE_ENV !== 'production') {
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running locally on port ${port}`);
  });
} else {
  module.exports = app;
}