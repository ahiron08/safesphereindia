import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, admin.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
  res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 });
  res.json({ user: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
};

export const logout = async (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};

export const me = async (req, res) => {
  res.json({ user: req.user });
};
