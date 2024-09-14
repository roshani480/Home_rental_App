const router = require("express").Router();
const Booking = require("../models/Booking");

router.post("/create", async (req, res) => {
  const { customerId, listingId, hostId, startDate, endDate, totalPrice } =
    req.body;

  const newBooking = new Booking({
    customerId,
    listingId,
    hostId,
    startDate,
    endDate,
    totalPrice,
  });

  await newBooking.save();

  res.send(newBooking);
});

module.exports = router;
