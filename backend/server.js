const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://anshika-roy.github.io/capstone-project-/';
const frontendOrigin = new URL(FRONTEND_URL).origin;
const allowedOrigins = new Set([frontendOrigin, 'http://localhost:5173', 'http://localhost:4173']);

const destinationRoutes = require('./routes/destinationRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const formRoutes = require('./routes/formRoutes');
const authRoutes = require('./routes/authRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) return callback(null, true);
    return callback(new Error('Origin not allowed by CORS'));
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Travel Destination Explorer backend is running!'
  });
});

app.use('/api/destinations', destinationRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/form', formRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/subscription', subscriptionRoutes);

const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error('MongoDB connection failed. Check that MONGO_URI in .env is correct.');
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
