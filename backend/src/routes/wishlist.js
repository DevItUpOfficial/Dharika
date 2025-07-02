const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const requireAuth = require("../middleware/auth");
const optionalAuth = require("../middleware/optionalAuth")

// --- Wishlist Routes ---

// Get all wishlists for a user
router.get('/wishlists/:userId', requireAuth, wishlistController.getWishlistsByUser);

// Create a new wishlist
router.post('/wishlists', requireAuth, wishlistController.createWishlist);

// Update a wishlist
router.put('/wishlists/:id', requireAuth, wishlistController.updateWishlist);

// Delete a wishlist
router.delete('/wishlists/:id', requireAuth, wishlistController.deleteWishlist);

// Share wishlist
router.post('/wishlists/:id/share', requireAuth, wishlistController.shareWishlist);

// Get a shared wishlist via token
router.get('/wishlists/shared/:token', optionalAuth, wishlistController.getSharedWishlist);


// --- Wishlist Item Routes ---

// Get all items in a wishlist
router.get('/wishlists/:wishlistId/items', requireAuth, wishlistController.getItems);

// Add an item to wishlist
router.post('/wishlists/:wishlistId/items', requireAuth, wishlistController.addItem);

// Remove an item
router.delete('/items/:itemId', requireAuth, wishlistController.removeItem);


// --- Collaborator Routes ---

// Add a collaborator
router.post('/wishlists/:wishlistId/collaborators', requireAuth, wishlistController.addCollaborator);

// Remove a collaborator
router.delete('/collaborators/:id', requireAuth, wishlistController.removeCollaborator);

// Update collaborator permissions
router.put('/collaborators/:id/permissions', requireAuth, wishlistController.updateCollaboratorPermissions);

module.exports = router;
