process.env.JWT_SECRET = 'test_secret';
process.env.JWT_EXPIRES_IN = '1d';

const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/database');
const axios = require('axios');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

jest.mock('axios');
jest.setTimeout(10000);

describe('Auth Routes', () => {
  let testUser;

  beforeAll(async () => {
    await sequelize.sync({ force: true }); 

    const hashedPassword = await bcrypt.hash('testpass', 10);
    testUser = await User.create({
      id: 'test-id',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: hashedPassword,
      phone: '0999999999',
    });

    axios.get.mockResolvedValue({ data: { role: 'User' } });
  });

  it('should login successfully', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'testpass'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Login successful');
    expect(res.body).toHaveProperty('userId', 'test-id');
    expect(res.headers['set-cookie']).toBeDefined(); 
  });

  it('should fail login with wrong password', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'wrongpass'
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid password.');
  });

  it('should logout successfully', async () => {
    const res = await request(app)
      .post('/auth/logout');

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Logged out successfully.');
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
