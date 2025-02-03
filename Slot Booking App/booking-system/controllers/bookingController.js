const { Slot, Booking, User } = require('../models'); // Import models

exports.bookSlot = (req, res) => {
  const { name, email, slotId } = req.body;
  let userData;
  
  User.findOrCreate({
    where: { email },
    defaults: { name, email }
  })
  .then(([user]) => {
    userData = user;
    return Slot.findByPk(slotId);
  })
  .then(slot => {
    if (!slot) {
      return res.status(400).send('Slot not found');
    }
    return Booking.count({ where: { slot_id: slot.id } })
      .then(bookingCount => {
        if (bookingCount >= 4) {
          return res.status(400).send('Slot fully booked');
        }
        return Booking.create({
          user_id: userData.id,
          slot_id: slot.id
        });
      });
  })
  .then(() => {
   return res.redirect('/');
  })
  .catch(err => {
    console.error(err);
    return res.status(500).send('Error booking slot');
  });
};

//  Cancel a booking
exports.cancelBooking = (req, res) => {
  const bookingId = req.body.bookingId; // Get booking ID from request

  Booking.findByPk(bookingId)
  .then(booking => {
    if (!booking) {
      return res.status(404).send('Booking not found');
    }
    return booking.destroy(); // Delete the booking
  })
  .then(() => {
    res.redirect('/'); // Redirect to update the slot availability
  })
  .catch(err => {
    console.error(err);
    res.status(500).send('Error cancelling booking');
  });
};

exports.renderHomePage = (req, res) => {
  Slot.findAll()
    .then(slots => {
      return Promise.all(slots.map(async (slot) => {
        const bookingCount = await Booking.count({ where: { slot_id: slot.id } });
        slot.available = 4 - bookingCount; // Calculate available slots (max 4 per slot)
        return slot;
      }));
    })
    .then(availableSlots => {
      return Booking.findAll({
        include: [
          { model: Slot, required: true },
          { model: User, required: true }
        ]
      }).then(bookings => {
        res.render('index', { slots: availableSlots, bookings });
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error fetching data');
    });
};

