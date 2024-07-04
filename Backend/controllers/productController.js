const Product = require("../models/product");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addProduct = async (req, res) => {
  const { name, price } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndRemove(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
