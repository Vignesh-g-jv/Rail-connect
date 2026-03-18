/**
 * Bookings Module
 * Simulates saving and retrieving booking history using LocalStorage
 */

const Bookings = {
  // Generate a random 10-digit PNR
  generatePNR: () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  },

  // Create a new booking
  createBooking: (userId, trainNo, date, passengers, totalAmount, travelClass) => {
    const bookingsStr = localStorage.getItem('bookings');
    const bookings = bookingsStr ? JSON.parse(bookingsStr) : [];

    const newBooking = {
      pnr: Bookings.generatePNR(),
      userId,
      trainNo,
      date,
      passengers,
      totalAmount,
      travelClass,
      bookingStatus: 'CONFIRMED',
      bookingDate: new Date().toISOString()
    };

    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    return newBooking;
  },

  // Get all bookings for a specific user
  getUserBookings: (userId) => {
    const bookingsStr = localStorage.getItem('bookings');
    if (!bookingsStr) return [];
    
    const bookings = JSON.parse(bookingsStr);
    return bookings.filter(b => b.userId === userId).sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
  }
};

window.Bookings = Bookings;
