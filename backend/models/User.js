const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // We will hash this for security
    cart: [
        {
            productId: { type: String, required: true },
            name: String,
            price: Number,
            image: String,
            quantity: { type: Number, default: 1 }
        }
    ]
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt'

module.exports = mongoose.model('User', userSchema);