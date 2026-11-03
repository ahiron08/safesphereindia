import { asyncHandler } from '../middleware/errorHandler.js';
import Service from '../models/Service.js';
export const listServices = asyncHandler(async (req, res) => res.json(await Service.find({ isActive: true })));
export const getService = asyncHandler(async (req, res) => {
  const s = await Service.findOne({ slug: req.params.slug });
  if (!s) return res.status(404).json({ message: 'Not found' });
  res.json(s);
});
export const createService = asyncHandler(async (req, res) => res.status(201).json(await Service.create(req.body)));
export const updateService = asyncHandler(async (req, res) => {
  const s = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!s) return res.status(404).json({ message: 'Not found' });
  res.json(s);
});
export const deleteService = asyncHandler(async (req, res) => { await Service.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); });
export const listAllServices = asyncHandler(async (req, res) => res.json(await Service.find()));
