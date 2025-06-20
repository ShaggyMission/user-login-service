const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors()); 

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');
    console.log(`User Login Service running on port ${PORT}`);
  } catch (err) {
    console.error('Unable to connect to database:', err);
  }
});
