// controllers/bookingController.js
// const { Slot, Booking, User } = require('../models'); // Import all models

// exports.bookSlot = async (req, res) => {
//   const { name, email, slotId } = req.body;
//   try {
//     // Find or create user
//     const [user] = await User.findOrCreate({
//       where: { email },
//       defaults: { name, email },
//     });

//     // Check slot availability
//     const slot = await Slot.findByPk(slotId);
//     if (!slot) {
//       return res.status(400).send('Slot not found');
//     }

//     const availableBookings = await slot.getAvailableSlots(); // Use the method here
//     if (availableBookings <= 0) {
//       return res.status(400).send('Slot fully booked');
//     }

//     // Create booking
//     await Booking.create({
//       user_id: user.id,
//       slot_id: slot.id,
//     });

//     // Redirect to the home page to show updated slots and bookings
//     res.redirect('/');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error booking slot');
//   }
// };

// controllers/bookingController.js
const { Slot, Booking, User } = require('../models'); // Import all models

exports.bookSlot = async (req, res) => {
  const { name, email, slotId } = req.body;
  try {
    // Find or create user
    const [user] = await User.findOrCreate({
      where: { email },
      defaults: { name, email },
    });

    // Check slot availability
    const slot = await Slot.findByPk(slotId);
    if (!slot) {
      return res.status(400).send('Slot not found');
    }

    // Count the current number of bookings for this slot
    const bookingCount = await Booking.count({ where: { slot_id: slot.id } });
    const maxBookings = 4; // Assuming a max of 4 bookings per slot

    // If the slot is fully booked, return an error
    if (bookingCount >= maxBookings) {
      return res.status(400).send('Slot fully booked');
    }

    // Create booking
    await Booking.create({
      user_id: user.id,
      slot_id: slot.id,
    });

    // Redirect to the home page to show updated slots and bookings
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error booking slot');
  }
};


// exports.renderHomePage = async (req, res) => {
//   try {
//     // Fetch all slots
//     const slots = await Slot.findAll();

//     // Fetch bookings for each slot and check availability
//     const availableSlots = await Promise.all(
//       slots.map(async (slot) => {
//         const bookingCount = await slot.countBookings(); // Use the method here to count bookings
//         slot.available = 4 - bookingCount; // Assuming a max of 4 bookings per slot
//         return slot;
//       })
//     );

//     // Fetch all bookings for the slots, include User and Slot information
//     const bookings = await Booking.findAll({
//       include: [
//         { model: Slot },
//         { model: User }
//       ]
//     });

//     // Pass slots and bookings data to the view
//     res.render('index', { slots: availableSlots, bookings });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error fetching data');
//   }
// };

// controllers/bookingController.js
exports.renderHomePage = async (req, res) => {
  try {
    // Fetch all slots
    const slots = await Slot.findAll();

    // Fetch bookings for each slot and check availability
    const availableSlots = await Promise.all(
      slots.map(async (slot) => {
        const bookingCount = await slot.countBookings(); // Use the method here to count bookings
        slot.available = 4 - bookingCount; // Assuming a max of 4 bookings per slot
        return slot;
      })
    );

    // // Fetch all bookings for the slots, include User and Slot information
    // const bookings = await Booking.findAll({
    //   include: [
    //     { model: Slot },
    //     { model: User }
    //   ]
    // });
    const bookings = await Booking.findAll({
      include: [
        { model: Slot, required: true }, // Ensure slot is always included
        { model: User, required: true }
      ]
    });
    

    // Pass slots and bookings data to the view
    console.log(bookings);
    res.render('index', { slots: availableSlots, bookings });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching data');
  }
};

