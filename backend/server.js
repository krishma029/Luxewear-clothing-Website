require('dotenv').config();
const path = require('path');
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const Groq = require('groq-sdk');
const axios = require('axios'); 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. DATABASE CONNECTION
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✨ Luxe Wear MongoDB Connected");
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
        process.exit(1);
    }
};
connectDB();

// 2. USER MODEL (Schema)
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: [
        {
            productId: String,
            name: String,
            price: Number,
            image: String,
            quantity: { type: Number, default: 1 }
        }
    ]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// 3. APP SETUP
const app = express();
app.use(cors());
app.use(express.json());

const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY || "zAHKkCYN9z5O44uWY4oe0lIU384dVaLVPiq02Qy8ArA";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const JWT_SECRET = process.env.JWT_SECRET || "luxe_secret_key_123";

const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } 
});

// --- STYLIST AI FUNCTIONS (Your Original Code) ---

async function analyzeWithGroq(imageBuffer, mimeType) {
    try {
        const base64Image = `data:${mimeType};base64,${imageBuffer.toString('base64')}`;
        const completion = await groq.chat.completions.create({
            messages: [{
                role: "user",
                content: [
                    { 
                        type: "text", 
                        text: `Act as a precise fashion stylist. Analyze this dress. Suggest ONE pair of matching footwear and ONE matching purse. Return ONLY JSON.` 
                    },
                    { type: "image_url", image_url: { url: base64Image } }
                ],
            }],
            model: "meta-llama/llama-4-scout-17b-16e-instruct", 
            temperature: 0.1,
            response_format: { type: "json_object" }
        });
        return JSON.parse(completion.choices[0].message.content);
    } catch (err) {
        throw new Error(`Stylist Analysis Failed: ${err.message}`);
    }
}

async function getUnsplashStylingData(query, category) {
    try {
        const categoryFilter = category === 'shoe' ? 'footwear shoes' : 'purse handbag';
        const finalQuery = `${query} ${categoryFilter} luxury studio product`;
        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: { query: finalQuery, per_page: 1, orientation: 'squarish' },
            headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` }
        });
        if (response.data.results && response.data.results.length > 0) {
            const photo = response.data.results[0];
            return {
                image_url: photo.urls.regular,
                product_link: photo.links.html,
                photographer: photo.user.name
            };
        }
        return null;
    } catch (error) {
        return null;
    }
}

// --- NEW AUTHENTICATION ROUTES ---

// SIGNUP
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ success: true, message: "Account Created!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// LOGIN
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) return res.status(400).json({ message: "Invalid Credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

        // --- NEW CODE TO STORE LOGIN DATA ---
        await LoginLog.create({
            userId: user._id,
            email: user.email,
            ipAddress: req.ip
        });
        // -------------------------------------

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- NEW CART ROUTES ---

// ADD TO CART
app.post('/api/cart/add', async (req, res) => {
    const { userId, product } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.cart.push(product);
        await user.save();
        res.json({ success: true, cart: user.cart });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET CART
app.get('/api/cart/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user.cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- ORIGINAL STYLIST ROUTE ---

app.post('/generate-look', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: "No image uploaded" });
        const suggestions = await analyzeWithGroq(req.file.buffer, req.file.mimetype);
        const [footwearData, accessoryData] = await Promise.all([
            getUnsplashStylingData(suggestions.footwear_prompt, 'shoe'),
            getUnsplashStylingData(suggestions.accessory_prompt, 'purse')
        ]);
        res.status(200).json({ success: true, footwear: footwearData, accessory: accessoryData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Luxe Wear Server active on port ${PORT}`));