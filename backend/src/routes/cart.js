const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.getCart);
router.post("/add", cartController.addToCart);
router.put("/update", cartController.updateCartItem);
router.delete("/remove/:itemId", cartController.removeCartItem);
router.delete("/clear", cartController.clearCart);
router.post("/merge", cartController.mergeAnonymousCart);

module.exports = router;