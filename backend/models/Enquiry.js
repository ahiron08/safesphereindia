import mongoose from 'mongoose';
const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  organization: { type: String, trim: true },
  subject: { type: String, trim: true },
  serviceType: { type: String, trim: true },
  message: { type: String, required: true, trim: true },
  status: { type: String, enum: ['New', 'Contacted', 'Resolved'], default: 'New' },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });
export default mongoose.model('Enquiry', enquirySchema);
