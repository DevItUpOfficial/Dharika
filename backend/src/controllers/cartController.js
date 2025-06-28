const cartService = require('../services/cart/cartService');


// --- Cart Handlers ---

// GET /api/cart/
// Get all cart items for a user
const getCart = async (req, res) => {
    try {
        const result = await cartService.getCart(req.userId);
        res.json(result);
    } 
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};




// POST /api/cart/add
// Add item to cart
const addToCart = async (req, res) => {
    try {
        const result = await cartService.addToCart(req.userId, req.body.variantId, req.body.quantity);
        res.json(result);
    } 
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};




// PUT /api/cart/update
// Update item quantity in cart
const updateCartItem = async (req, res) => {
    try {
        const result = await cartService.updateCartItem(req.userId, req.body.itemId, req.body.quantity);
        res.json(result);
    } 
    catch (err) {
        const code = err.message === 'Item not found' || err.message === 'Cart not found' ? 404 : 403;
        res.status(code).json({ message: err.message });
    }
};




// DELETE /api/cart/remove/:itemId
// Remove item from cart
const removeCartItem = async (req, res) => {
    try {
        const result = await cartService.removeCartItem(req.userId, req.params.itemId);
        res.json(result);
    } 
    catch (err) {
        const code = err.message === 'Item not found' ? 404 : 403;
        res.status(code).json({ message: err.message });
    }
};




// DELETE /api/cart/clear
// Clear all items in the cart
const clearCart = async (req, res) => {
    try {
        const result = await cartService.clearCart(req.userId);
        res.json(result);
    } 
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};




// POST /api/cart/merge
// Merge anonymous cart with user's cart
const mergeAnonymousCart = async (req, res) => {
    try {
        const result = await cartService.mergeAnonymousCart(req.userId, req.body.anonymousCartId);
        res.json(result);
    } 
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};




module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
    mergeAnonymousCart,
};
