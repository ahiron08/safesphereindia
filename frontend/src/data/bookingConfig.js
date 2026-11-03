// Central configuration for appointment booking.
// Adjust available times and the daily booking limit here.
// NOTE: Frontend-only configuration. Production enforcement must happen server-side.

export const bookingConfig = {
  // Maximum number of bookings allowed per day.
  dailyLimit: 4,
  // Available appointment slots (24-hour or 12-hour strings are fine).
  availableSlots: [
    '10:00 AM',
    '11:30 AM',
    '02:00 PM',
    '04:00 PM',
  ],
  // Services that can be booked.
  services: [
    'POSH Training & Workplace Wellbeing',
    'Children & Adolescent Wellbeing',
    'Tranquillium™ Programme',
    'Professional Development Workshop',
    'Customised Institutional Training',
    'General Consultation',
  ],
  // How many days ahead bookings can be made.
  maxAdvanceDays: 60,
  // Weekdays available (0 = Sunday ... 6 = Saturday). Default excludes Sunday.
  availableWeekdays: [1, 2, 3, 4, 5, 6],
}
