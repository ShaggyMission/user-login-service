jest.setTimeout(10000);
jest.mock('../models/userModel');

const request = require('supertest');
const app = require('../app');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

describe('Auth Routes (mocked)', () => {
  let hashedPassword;

  beforeAll(async () => {
    hashedPassword = await bcrypt.hash('testpass', 10);

    // Simular el comportamiento del modelo User
    User.findOne = jest.fn().mockImplementation(({ where: { email } }) => {
      if (email === 'test@example.com') {
        return Promise.resolve({
          id: 'test-id',
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          password: hashedPassword,
          phone: '0999999999'
        });
      }
      return Promise.resolve(null);
    });
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
  });
});


  afterAll(async () => {
    await sequelize.close();
  });
});
