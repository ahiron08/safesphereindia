import mongoose from 'mongoose';
const settingsSchema = new mongoose.Schema({
  businessName: { type: String, default: 'Safe Sphere India' },
  email: { type: String, trim: true },
  phone: { type: String, trim: true },
  whatsapp: { type: String, trim: true },
  address: { type: String, trim: true },
  socialLinks: { type: Object, default: {} },
  bookingSettings: { type: Object, default: {} },
}, { timestamps: true });
export default mongoose.model('SiteSettings', settingsSchema);
