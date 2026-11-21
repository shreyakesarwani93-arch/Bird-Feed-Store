require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Product = require("./Product");
const Order = require("./Order");

const app = express();

app.use(cors());
app.use(express.json());

// Home API
app.get("/", (req, res) => {
  res.send("UPDATED BACKEND TEST!");
});

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new product
app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create new order
app.post("/api/orders", async (req, res) => {
  try {
    const { customerName, email, phone, items } = req.body;

    if (!customerName || !phone || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Customer details and order items are required."
      });
    }

    const totalAmount = items.reduce((total, item) => {
      return total + Number(item.price) * Number(item.quantity);
    }, 0);

    if (
      items.some(item =>
        !item.productName ||
        !Number.isFinite(Number(item.price)) ||
        Number(item.price) < 0 ||
        !Number.isInteger(Number(item.quantity)) ||
        Number(item.quantity) < 1
      )
    ) {
      return res.status(400).json({
        message: "Invalid order items."
      });
    }

    const order = new Order({
      customerName,
      email,
      phone,
      items,
      totalAmount
    });

    const savedOrder = await order.save();

    res.status(201).json({
      message: "Order placed successfully!",
      order: savedOrder
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all orders
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Connect MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error);
  });