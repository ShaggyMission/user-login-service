const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const JWT_SECRET = 'una_clave_secreta_segura';
const JWT_EXPIRES_IN = '1d';

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required.' });

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(404).json({ message: 'User not found.' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: 'Invalid password.' });

    const roleResponse = await axios.get(`http://localhost:3003/roles/user-role/${user.id}`);
    const role = roleResponse.data.role || 'NoRole';

    const token = jwt.sign(
      { userId: user.id, email: user.email, role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'Lax',
    });

    res.status(200).json({ message: 'Login successful', userId: user.id });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully.' });
};

module.exports = { loginUser, logoutUser };
