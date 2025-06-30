const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const requireAuth = require("../middleware/auth");

// --- Cart Routes ---


// Get all cart items
router.get("/", requireAuth, cartController.getCart);


// Add an item to cart
router.post("/add", requireAuth, cartController.addToCart);


// Update quantity of an item in cart
router.put("/update", requireAuth, cartController.updateCartItem);


// Remove an item from cart
router.delete("/remove/:itemId", requireAuth, cartController.removeCartItem);


// Clear all items from cart
router.delete("/clear", requireAuth, cartController.clearCart);


// Merge anonymous cart with user's cart
router.post("/merge", requireAuth, cartController.mergeAnonymousCart);


module.exports = router;
