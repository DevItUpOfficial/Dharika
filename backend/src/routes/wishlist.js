const express = require('express');
const router = express.Router();

const wishlistController = require('../controllers/wishlistController');

// --- Wishlist Routes ---

// Get all wishlists for a user
router.get('/wishlists/:userId', wishlistController.getWishlistsByUser);

// Create a new wishlist
router.post('/wishlists', wishlistController.createWishlist);

// Update a wishlist
router.put('/wishlists/:id', wishlistController.updateWishlist);

// Delete a wishlist
router.delete('/wishlists/:id', wishlistController.deleteWishlist);

// Share wishlist
router.post('/wishlists/:id/share', wishlistController.shareWishlist);

// Get a shared wishlist via token
router.get('/wishlists/shared/:token', wishlistController.getSharedWishlist);


// --- Wishlist Item Routes ---

// Get all items in a wishlist
router.get('/wishlists/:wishlistId/items', wishlistController.getItems);

// Add an item to wishlist
router.post('/wishlists/:wishlistId/items', wishlistController.addItem);

// Remove an item
router.delete('/items/:itemId', wishlistController.removeItem);


// --- Collaborator Routes ---

// Add a collaborator
router.post('/wishlists/:wishlistId/collaborators', wishlistController.addCollaborator);

// Remove a collaborator
router.delete('/collaborators/:id', wishlistController.removeCollaborator);

// Update collaborator permissions
router.put('/collaborators/:id/permissions', wishlistController.updateCollaboratorPermissions);


module.exports = router;
