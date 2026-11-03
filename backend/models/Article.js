import mongoose from 'mongoose';
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  excerpt: { type: String, trim: true },
  content: { type: String, required: true },
  category: { type: String, trim: true },
  coverImage: { type: String, trim: true },
  author: { type: String, trim: true },
  status: { type: String, enum: ['Draft', 'Published'], default: 'Draft' },
  publishedAt: { type: Date },
}, { timestamps: true });
export default mongoose.model('Article', articleSchema);
