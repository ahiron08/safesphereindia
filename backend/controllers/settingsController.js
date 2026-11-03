import { asyncHandler } from '../middleware/errorHandler.js';
import SiteSettings from '../models/SiteSettings.js';
export const getSettings = asyncHandler(async (req, res) => {
  let s = await SiteSettings.findOne();
  if (!s) s = await SiteSettings.create({});
  res.json(s);
});
export const updateSettings = asyncHandler(async (req, res) => {
  let s = await SiteSettings.findOne();
  if (!s) s = await SiteSettings.create(req.body);
  else Object.assign(s, req.body); await s.save();
  res.json(s);
});
export const health = (req, res) => res.json({ status: 'ok', timestamp: new Date() });
