const CartItem = require('../models/cartItem');
const Product = require('../models/product');
const sequelize = require('../config/db');

exports.getCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.findAll({ include: Product });
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cartItem = await CartItem.findOne({ where: { ProductId: productId } });

    if (cartItem) {
      cartItem.quantity += quantity;
      cartItem.subtotal = cartItem.quantity * product.price;
    } else {
      cartItem = await CartItem.create({
        ProductId: productId,
        quantity: quantity,
        subtotal: product.price * quantity
      });
    }

    await cartItem.save();

    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCartItemQuantity = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    let cartItem = await CartItem.findByPk(id);

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    const product = await Product.findByPk(cartItem.ProductId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    cartItem.quantity = quantity;
    cartItem.subtotal = quantity * product.price;

    await cartItem.save();

    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCartItem = async (req, res) => {
  const { id } = req.params;

  try {
    const cartItem = await CartItem.findByPk(id);

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await cartItem.destroy();

    res.json({ message: 'Cart item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
