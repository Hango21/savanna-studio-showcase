const mongoose = require('mongoose');

let cachedConnection = null;

const connectDB = async () => {
  // Reuse existing connection in serverless environment
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('Using cached database connection');
    return cachedConnection;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 20000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    cachedConnection = conn;
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // In serverless, don't exit process - just throw error
    throw error;
  }
};

module.exports = connectDB;
