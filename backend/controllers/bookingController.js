import { asyncHandler } from '../middleware/errorHandler.js';
import Booking from '../models/Booking.js';
import Availability from '../models/Availability.js';

export const createBooking = asyncHandler(async (req, res) => {
  const { customerName, email, phone, organization, service, programme, audience, deliveryMode, bookingDate, startTime, endTime, duration, message } = req.body;
  if (!customerName || !email || !bookingDate || !startTime || !endTime) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(bookingDate)) {
    return res.status(400).json({ message: 'Invalid booking date' });
  }
  // overlap check
  const overlapping = await Booking.collection.findOne({
    $or: [
      { bookingDate },
      { bookingDate: new Date(bookingDate + 'T00:00:00Z') },
    ],
    status: { $in: ['Pending', 'Confirmed'] },
    startTime: { $lt: endTime },
    endTime: { $gt: startTime },
  });
  if (overlapping) return res.status(409).json({ message: 'Time slot already booked' });
  const booking = await Booking.create({ customerName, email, phone, organization, service, programme, audience, deliveryMode, bookingDate, startTime, endTime, duration, message });
  res.status(201).json(booking);
});

export const getAvailability = asyncHandler(async (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ message: 'date required' });
  const slots = await Availability.collection.find({ date }).toArray();
  const bookings = await Booking.collection.find({
    $or: [
      { bookingDate: date },
      { bookingDate: new Date(date + 'T00:00:00Z') },
    ],
    status: { $in: ['Pending', 'Confirmed'] },
  }).toArray();
  res.json({ slots, bookings });
});

export const getBookingCounts = asyncHandler(async (req, res) => {
  const agg = await Booking.aggregate([
    { $match: { status: { $in: ['Pending', 'Confirmed'] } } },
    {
      $group: {
        _id: {
          $cond: {
            if: { $eq: [{ $type: '$bookingDate' }, 'date'] },
            then: { $dateToString: { format: '%Y-%m-%d', date: '$bookingDate' } },
            else: '$bookingDate',
          },
        },
        count: { $sum: 1 },
      },
    },
  ]);
  const map = {};
  agg.forEach((r) => { if (r._id) map[r._id] = r.count });
  res.json(map);
});

export const listBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json(bookings);
});
export const getBooking = asyncHandler(async (req, res) => {
  const b = await Booking.findById(req.params.id);
  if (!b) return res.status(404).json({ message: 'Not found' });
  res.json(b);
});
export const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status, adminNotes } = req.body;
  const b = await Booking.findByIdAndUpdate(req.params.id, { status, adminNotes }, { new: true });
  if (!b) return res.status(404).json({ message: 'Not found' });
  res.json(b);
});
export const updateBooking = asyncHandler(async (req, res) => {
  const b = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!b) return res.status(404).json({ message: 'Not found' });
  res.json(b);
});
export const deleteBooking = asyncHandler(async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});
