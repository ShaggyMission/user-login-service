const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true               
}));


app.use('/auth', authRoutes);

const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/login/auth-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
