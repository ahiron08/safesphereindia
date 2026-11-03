import { asyncHandler } from '../middleware/errorHandler.js';
import Availability from '../models/Availability.js';
export const listAvailability = asyncHandler(async (req, res) => res.json(await Availability.find().sort({ date: 1 })));
export const createAvailability = asyncHandler(async (req, res) => res.status(201).json(await Availability.create(req.body)));
export const updateAvailability = asyncHandler(async (req, res) => {
  const a = await Availability.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!a) return res.status(404).json({ message: 'Not found' });
  res.json(a);
});
export const deleteAvailability = asyncHandler(async (req, res) => { await Availability.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); });
