const Cart = require('../../models/Cart');
const CartItem = require('../../models/CartItem');
const mongoose = require('mongoose');



// Get the cart for a user
const getCart = async (userId) => {
    const cart = await Cart.findOne({ userId });
    const items = cart ? await CartItem.find({ cartId: cart._id }) : [];
    return { cart, items };
};




// Add items to cart
const addToCart = async (userId, variantId, quantity) => {

    //Ensure quantity is a valid number
    quantity = parseInt(quantity, 10);
    if (isNaN(quantity)) {
        throw new Error("Invalid quantity");
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = await Cart.create({ userId });
    }

    let item = await CartItem.findOne({ cartId: cart._id, productVariantId: variantId }); // Check if item already exists in cart
    if (item) {
        // If item exists, increase quantity
        item.quantity += quantity;
        await item.save();
    }
    else {
        // If not, create a new item
        item = await CartItem.create({ cartId: cart._id, productVariantId: variantId, quantity });
    }

    const items = await CartItem.find({ cartId: cart._id });
    return { cart, items };
};





// Update quantity of Cart items
const updateCartItem = async (userId, itemId, quantity) => {

    // Find the cart item
    const item = await CartItem.findById(itemId);
    if (!item) throw new Error('Item not found');

    // Find the cart associated with the item
    const cart = await Cart.findById(item.cartId);
    if (!cart) throw new Error('Cart not found');

    // Check if the cart belongs to the logged-in user
    if (cart.userId.toString() !== userId) {
        const err = new Error('Not authorized to modify this cart');
        err.status = 403;
        throw err;
    }

    item.quantity = quantity;
    await item.save();

    const items = await CartItem.find({ cartId: cart._id });
    return { cart, items };
};





// Remove cart items
const removeCartItem = async (userId, itemId) => {

    // If want to check valid MongoDB ObjectId or not
    // if (!mongoose.Types.ObjectId.isValid(itemId)) {
    //     const err = new Error('Invalid item ID');
    //     err.status = 400;
    //     throw err;
    // }

    const item = await CartItem.findById(itemId);
    if (!item) throw new Error('Item not found');

    const cart = await Cart.findById(item.cartId);

    // Check if item belongs to user's cart
    if (!cart || cart.userId.toString() !== userId) {
        const err = new Error('Not authorized to remove this item');
        err.status = 403;
        throw err;
    }

    await item.deleteOne();
    const items = await CartItem.find({ cartId: cart._id });
    return { cart, items };
};





//Clear all Cart items for a user
const clearCart = async (userId) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error('Cart not found for this user');

    await CartItem.deleteMany({ cartId: cart._id });
    return true;
};





//Merge anonymous Cart with an existing user cart
    const mergeAnonymousCart = async (userId, anonymousCartId) => {
    const anonCart = await Cart.findById(anonymousCartId);
    if (!anonCart) throw new Error('Anonymous cart not found');

    const userCart = await Cart.findOne({ userId }) || await Cart.create({ userId });
    const anonItems = await CartItem.find({ cartId: anonCart._id });

    // Get all items from anonymous cart
    for (let item of anonItems) {
        const existing = await CartItem.findOne({
            cartId: userCart._id,
            productVariantId: item.productVariantId
        });

        if (existing) {
            // If item already exists in user's cart, merge quantities
            existing.quantity += item.quantity;
            await existing.save();
        }
        else {
            // Otherwise, move the item to the user's cart
            await CartItem.create({
            cartId: userCart._id,
            productVariantId: item.productVariantId,
            quantity: item.quantity
            });
        }
    }

    // Clean up: delete anonymous cart and its items
    await CartItem.deleteMany({ cartId: anonCart._id });
    await Cart.findByIdAndDelete(anonCart._id);

    const items = await CartItem.find({ cartId: userCart._id });
    return { cart: userCart, items };
};




module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
    mergeAnonymousCart
};
