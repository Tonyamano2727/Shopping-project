const mongoose = require("mongoose"); // Erase if already required
const slug = require('slugify')
// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // bo dau cach o 2 dau
    },
    slug: {
        type: String,
        required: true,
        // unique: true,
        lowercase: true
    },
    description: {
      type: Array,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    color: {
      type: String,
      require: true,
    },
    ratings: [          // danh gia
      {
        star: { type: Number },
        postedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
        comment: { type: String },
      },
    ],
    totalRatings: {   // tong so danh gia
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Products", productSchema);
