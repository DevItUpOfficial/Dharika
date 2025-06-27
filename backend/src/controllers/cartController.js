const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");

//Get all the items 
exports.getCart = async (req, res) => {
    const userId = req.userId; //user data from auth middleware after verifying token
    const cart = await Cart.findOne({ userId });    //Finding the cart by user
    const items = cart ? await CartItem.find({ cartId: cart._id }) : [];
    res.json({ cart, items });
};




//Add items to cart
exports.addToCart = async (req, res) => {
    let  { variantId, quantity } = req.body;
    const userId = req.userId;

    //Ensuring quantity is a valid number
    quantity = parseInt(quantity, 10);
    if (isNaN(quantity)) {
        return res.status(400).json({ message: "Invalid quantity" });
    }

    //Find or create the user's cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = await Cart.create({ userId });
    }

    let item = await CartItem.findOne({ cartId: cart._id, productVariantId: variantId });   //Check if item already exists in cart

    if (item) {
        item.quantity += quantity;  //If item exists, increase quantity
        await item.save();
    } else {
        item = await CartItem.create({ cartId: cart._id, productVariantId: variantId, quantity });  //If not, create a new item
    }

    const items = await CartItem.find({ cartId: cart._id });
    res.json({ cart, items });
};





//Updating quantity of Cart items
exports.updateCartItem = async (req, res) => {
    const userId = req.userId;
    const { itemId, quantity } = req.body;

    //Find the cart item
    const item = await CartItem.findById(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });
    
    //Find the cart associated with the item
    const cart = await Cart.findById(item.cartId);
    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }
    
    //Check if the cart belongs to the logged-in user
    if (cart.userId.toString() !== userId) {
        return res.status(403).json({ message: "Not authorized to modify this cart" });
    }

    item.quantity = quantity;
    await item.save();

    const items = await CartItem.find({ cartId: cart._id });
    res.json({ cart, items });
};






//Removing cart items
exports.removeCartItem = async (req, res) => {
    const userId = req.userId;
    const itemId = req.params.itemId;

    const item = await CartItem.findById(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    const cart = await Cart.findById(item.cartId);

    //Check if item belongs to user's cart
    if (!cart || cart.userId.toString() !== userId) {
        return res.status(403).json({ message: "Not authorized to remove this item" });
    }

    await item.deleteOne();

    const items = await CartItem.find({ cartId: cart._id });
    res.json({ cart, items });
};






//Clearing all Cart items for a user
exports.clearCart = async (req, res) => {
    const userId = req.userId;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
        return res.status(404).json({ success: false, message: "Cart not found for this user" });
    }
    
    await CartItem.deleteMany({ cartId: cart._id });
    res.json({ success: true });
};





//Merging anonymous Cart with a existing user cart
exports.mergeAnonymousCart = async (req, res) => {
    const { anonymousCartId } = req.body;
    const userId = req.userId;

    const anonCart = await Cart.findById(anonymousCartId);
    const userCart = await Cart.findOne({ userId }) || await Cart.create({ userId });
    if (!anonCart) return res.status(404).json({ message: "Anonymous cart not found" });

    //Get all items from anonymous cart
    const anonItems = await CartItem.find({ cartId: anonCart._id });
    for (let item of anonItems) {
        const existing = await CartItem.findOne({
            cartId: userCart._id,
            productVariantId: item.productVariantId
        });

        if (existing) {
            existing.quantity += item.quantity;     //If item already exists in user's cart, merge quantities
            await existing.save();
        } else {
            await CartItem.create({                 //Otherwise, move the item to the user's cart
            cartId: userCart._id,
            productVariantId: item.productVariantId,
            quantity: item.quantity
            });
        }
    }

    //Clean up: delete anonymous cart and its items
    await CartItem.deleteMany({ cartId: anonCart._id });
    await Cart.findByIdAndDelete(anonCart._id);

    const items = await CartItem.find({ cartId: userCart._id });
    res.json({ cart: userCart, items });
};