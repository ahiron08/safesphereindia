import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import * as c from '../controllers/settingsController.js';
const r = Router();
r.get('/', c.getSettings);
r.put('/', protect, c.updateSettings);
export default r;
