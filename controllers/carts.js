const { Cart } = require('../models');

const getUserCarts = async (req, res) => {
  try {
    const userId = req.user.githubId; 
    const carts = await Cart.find({ userId: userId });
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findOne({ _id: req.params.cartId, userId: req.user.githubId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createCart = async (req, res) => {
  try {
    const newCart = new Cart({
      userId: req.user.githubId,
      items: req.body.items,
      status: 'active'
    });
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { _id: req.params.cartId, userId: req.user.githubId },
      req.body,
      { new: true }
    );
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ _id: req.params.cartId, userId: req.user.githubId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.status(200).json({ message: 'Cart deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getUserCarts, getCartById, createCart, updateCart, deleteCart };