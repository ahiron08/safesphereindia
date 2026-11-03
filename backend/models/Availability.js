import mongoose from 'mongoose';
const availabilitySchema = new mongoose.Schema({
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
  notes: { type: String, trim: true },
}, { timestamps: true });
availabilitySchema.index({ date: 1 });
export default mongoose.model('Availability', availabilitySchema);
