import 'dotenv/config';
import dns from 'dns';
dns.setServers(['1.1.1.1', '8.8.8.8']);
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import Admin from '../models/Admin.js';

await connectDB();
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
if (!email || !password) { console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD'); process.exit(1); }
const exists = await Admin.findOne({ email });
if (exists) { console.log('Admin already exists'); process.exit(0); }
const hashed = await bcrypt.hash(password, 12);
await Admin.create({ name: 'Admin', email, password: hashed, role: 'superadmin' });
console.log('Admin created');
process.exit(0);
