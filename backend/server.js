const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const destinationRoutes = require('./routes/destinationRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const formRoutes = require('./routes/formRoutes');

app.use(cors());
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
