import { asyncHandler } from '../middleware/errorHandler.js';
import Article from '../models/Article.js';

export const listArticles = asyncHandler(async (req, res) => {
  const filter = { status: 'Published' };
  if (req.query.category) filter.category = req.query.category;
  const arts = await Article.find(filter).sort({ publishedAt: -1, createdAt: -1 });
  res.json(arts);
});
export const getArticle = asyncHandler(async (req, res) => {
  const a = await Article.findOne({ slug: req.params.slug });
  if (!a) return res.status(404).json({ message: 'Not found' });
  res.json(a);
});
export const createArticle = asyncHandler(async (req, res) => {
  if (req.body.status === 'Published' && !req.body.publishedAt) req.body.publishedAt = new Date();
  const a = await Article.create(req.body);
  res.status(201).json(a);
});
export const updateArticle = asyncHandler(async (req, res) => {
  if (req.body.status === 'Published') {
    const existing = await Article.findById(req.params.id);
    if (existing && existing.status !== 'Published' && !req.body.publishedAt) req.body.publishedAt = new Date();
  }
  const a = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!a) return res.status(404).json({ message: 'Not found' });
  res.json(a);
});
export const deleteArticle = asyncHandler(async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});
export const listAllArticles = asyncHandler(async (req, res) => {
  res.json(await Article.find().sort({ createdAt: -1 }));
});
