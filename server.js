const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);

const PORT = 3002;

sequelize.authenticate()
  .then(() => {
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`User Login Service running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to database:', err);
  });
