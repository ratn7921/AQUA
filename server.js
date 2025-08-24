// ------------------------- server.js -------------------------
require('dotenv').config(); // load env first

const mongoose = require("mongoose");
const connectDB = require('./server/config/db');

const start = async () => {
  await connectDB();

  // require app after DB connected so Mongoose models/routes don't buffer
  const app = require('./server/app.js');
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    start().catch(err => {
      console.error('Startup error:', err);
      process.exit(1);
    });
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
