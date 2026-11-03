import { asyncHandler } from '../middleware/errorHandler.js';
import Enquiry from '../models/Enquiry.js';

export const createEnquiry = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ message: 'Missing required fields' });
  const e = await Enquiry.create(req.body);
  res.status(201).json(e);
});
export const listEnquiries = asyncHandler(async (req, res) => res.json(await Enquiry.find().sort({ createdAt: -1 })));
export const getEnquiry = asyncHandler(async (req, res) => {
  const e = await Enquiry.findById(req.params.id);
  if (!e) return res.status(404).json({ message: 'Not found' });
  res.json(e);
});
export const updateEnquiry = asyncHandler(async (req, res) => {
  const e = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!e) return res.status(404).json({ message: 'Not found' });
  res.json(e);
});
export const deleteEnquiry = asyncHandler(async (req, res) => {
  await Enquiry.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});
