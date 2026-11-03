import 'dotenv/config';
import dns from 'dns';
dns.setServers(['1.1.1.1', '8.8.8.8']);
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import availabilityRoutes from './routes/availabilityRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import { health } from './controllers/settingsController.js';

const app = express();
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 });
app.use('/api', limiter);

app.get('/api/v1/health', health);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/enquiries', enquiryRoutes);
app.use('/api/v1/articles', articleRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/availability', availabilityRoutes);
app.use('/api/v1/settings', settingsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}).catch(err => { console.error(err); process.exit(1); });
