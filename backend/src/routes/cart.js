const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");


// --- Cart Routes ---


// Get all cart items
router.get("/", cartController.getCart);


// Add an item to cart
router.post("/add", cartController.addToCart);


// Update quantity of an item in cart
router.put("/update", cartController.updateCartItem);


// Remove an item from cart
router.delete("/remove/:itemId", cartController.removeCartItem);


// Clear all items from cart
router.delete("/clear", cartController.clearCart);


// Merge anonymous cart with user's cart
router.post("/merge", cartController.mergeAnonymousCart);


module.exports = router;
