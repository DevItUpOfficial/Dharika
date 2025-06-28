const wishlistService = require('../services/wishlist/wishlistService');
const wishlistItemService = require('../services/wishlist/wishlistItemService');
const wishlistCollaboratorService = require('../services/wishlist/wishlistCollaboratorService');
const User = require('../models/User');


// --- Wishlist Handlers ---

// GET /api/wishlists/:userId
const getWishlistsByUser = async (req, res) => {
  try {
    const wishlists = await wishlistService.getByUser(req.params.userId);
    res.json(wishlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/wishlists
const createWishlist = async (req, res) => {
  try {
    const wishlist = await wishlistService.create(req.body);
    res.status(201).json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/wishlists/:id
const updateWishlist = async (req, res) => {
  try {
    const updated = await wishlistService.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/wishlists/:id
const deleteWishlist = async (req, res) => {
  try {
    await wishlistService.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/wishlists/:id/share
const shareWishlist = async (req, res) => {
  try {
    const shareData = await wishlistService.share(req.params.id);
    res.json(shareData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/wishlists/shared/:token
const getSharedWishlist = async (req, res) => {
  try {
    const sharedData = await wishlistService.getShared(req.params.token);
    res.json(sharedData);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};


// --- Wishlist Item Handlers ---

// GET /api/wishlists/:wishlistId/items
const getItems = async (req, res) => {
  try {
    const items = await wishlistItemService.getByWishlist(req.params.wishlistId);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/wishlists/:wishlistId/items
const addItem = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    const item = await wishlistItemService.add(req.params.wishlistId, productId, userId);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/items/:itemId
const removeItem = async (req, res) => {
  try {
    await wishlistItemService.remove(req.params.itemId);
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};


// --- Collaborator Handlers ---

// POST /api/wishlists/:wishlistId/collaborators
const addCollaborator = async (req, res) => {
  try {
    const { userId, canEdit = false } = req.body;
    const collaborator = await wishlistCollaboratorService.addCollaborator(
      req.params.wishlistId,
      userId,
      canEdit,
      req.user.userId,
      req.user.role
    );
    res.status(201).json(collaborator);
  } catch (err) {
    const status = err.message === 'User is already a collaborator' ? 400 : 500;
    res.status(status).json({ error: err.message });
  }
};

// DELETE /api/collaborators/:id
const removeCollaborator = async (req, res) => {
  try {
    await wishlistCollaboratorService.removeCollaborator(req.params.id, req.user.userId, req.user.role);
    res.status(204).end();
  } catch (err) {
    const status = err.message === 'Collaborator not found' ? 404 : 500;
    res.status(status).json({ error: err.message });
  }
};

// PUT /api/collaborators/:id/permissions
const updateCollaboratorPermissions = async (req, res) => {
  try {
    const { canEdit } = req.body;
    const updated = await wishlistCollaboratorService.updatePermissions(
      req.params.id,
      canEdit,
      req.user.userId,
      req.user.role
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  // wishlist
  getWishlistsByUser,
  createWishlist,
  updateWishlist,
  deleteWishlist,
  shareWishlist,
  getSharedWishlist,

  // wishlist items
  getItems,
  addItem,
  removeItem,

  // collaborators
  addCollaborator,
  removeCollaborator,
  updateCollaboratorPermissions,
};
