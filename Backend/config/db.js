const mongoose = require('mongoose');

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        console.error('Error: MONGO_URI is not defined in .env file');
        process.exit(1);  // Stop the server if URI is missing
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1);  // Exit on connection failure
    }
};

module.exports = connectDB;
