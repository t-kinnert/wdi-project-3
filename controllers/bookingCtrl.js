const Booking = require('../models/booking');

function createBooking(req, res, next) {
  // the booker is the currently logged in user
  req.body.booker = req.tokenUserId;
  // the animal is the animal whose page we're visiting
  req.body.animal = req.params.animalId;
  Booking.create(req.body)
    .then(booking => Booking.populate(booking, 'booker animal'))
    .then(booking => res.json(booking))
    .catch(next);
}

function bookingIndex(req, res, next) {
  Booking
    .find({ $and: [{animal: {$in: req.params.animalId }}]
    })
    .populate('animal booker')
    .then(bookings => res.json(bookings))
    .catch(next);
}

function bookingShow(req, res, next) {
  Booking.findById(req.params.id)
    .populate('animal booker')
    .then(booking => res.json(booking))
    .catch(next);
}


// function updateBooking(req, res, next) {
//   Booking.findById(req.params.bookingId)
//     .then(booking => booking.set(req.body))
//     .then(booking => booking.save())
//     .then(booking => res.json(booking))
//     .catch(next);
// }

function deleteBooking(req, res, next) {
  Booking.findByIdAndDelete(req.params.bookingId)
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  create: createBooking,
  index: bookingIndex,
  delete: deleteBooking,
  show: bookingShow
};
