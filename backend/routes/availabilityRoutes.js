import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import * as c from '../controllers/availabilityController.js';
const r = Router();
r.get('/', protect, c.listAvailability);
r.post('/', protect, c.createAvailability);
r.put('/:id', protect, c.updateAvailability);
r.delete('/:id', protect, c.deleteAvailability);
export default r;
