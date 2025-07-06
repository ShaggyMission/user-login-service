process.env.JWT_SECRET = 'test_secret';
process.env.JWT_EXPIRES_IN = '1d';

const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const axios = require('axios');

jest.mock('axios');

describe('Simple Login Test', () => {
  beforeAll(async () => {
    await sequelize.sync(); 
    const existingUser = await User.findOne({ where: { email: 'tes@email.com' } });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('test', 10);

      await User.create({
        id: 'test-id',
        firstName: 'Test',
        lastName: 'Test',
        email: 'tes@email.com',
        password: hashedPassword,
        phone: '+1234567890',
      });
    }

    axios.get.mockResolvedValue({ data: { role: 'User' } });
  });

  it('should login successfully with correct credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'tes@email.com',
        password: 'test'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Login successful');
    expect(res.body).toHaveProperty('userId');
  });

  afterAll(async () => {
    await sequelize.close();
  });
