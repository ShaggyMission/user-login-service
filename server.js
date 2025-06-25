const app = require('./app');
const sequelize = require('./config/database');

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
