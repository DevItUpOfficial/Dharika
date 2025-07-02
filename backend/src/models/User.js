const mongoose = require("mongoose");
const Cart = require("./Cart");
const Wishlist = require("./Wishlist");
const GameScore = require("./GameScore");
const Order = require("./Order");


const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },

    passwordHash: {
      type: String,
     
    },

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true, 
    },

    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },


    role: {
      type: String,
      enum: ["customer", "admin", "vendor"],
      default: "customer",
    },


    gameScore: {
      type: Number,
      default: 0,
    },

  
    lastLoginIP: {
      type: String,
      select: false, 
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const userId = this._id;
    await Promise.all([
      Cart.deleteMany({ userId }),
      Wishlist.deleteMany({ userId }),
      GameScore.deleteMany({ userId }),
      Order.deleteMany({ userId }),
    ]);
    next();
  }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ googleId: 1 }, { unique: true, sparse: true });
userSchema.index({ role: 1 });

<<<<<<< HEAD
module.exports = mongoose.model("User", userSchema);
=======
module.exports = mongoose.model("User", userSchema);
>>>>>>> feature/auth
