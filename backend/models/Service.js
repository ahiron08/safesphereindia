import mongoose from 'mongoose';
const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  category: { type: String, trim: true },
  description: { type: String, trim: true },
  features: { type: [String], default: [] },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });
export default mongoose.model('Service', serviceSchema);
