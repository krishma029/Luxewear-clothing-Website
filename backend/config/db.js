const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // This looks for a variable in your .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`Luxe Fashion DB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;