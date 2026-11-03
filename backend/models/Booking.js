import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  organization: { type: String, trim: true },
  service: { type: String, trim: true },
  programme: { type: String, trim: true },
  audience: { type: String, trim: true },
  deliveryMode: { type: String, enum: ['Online', 'Offline'], default: 'Online' },
  bookingDate: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  duration: { type: Number },
  message: { type: String, trim: true },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Rejected', 'Cancelled'], default: 'Pending' },
  adminNotes: { type: String, trim: true },
}, { timestamps: true });

bookingSchema.index({ bookingDate: 1, startTime: 1, endTime: 1 });

export default mongoose.model('Booking', bookingSchema);
