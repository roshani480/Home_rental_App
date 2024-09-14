const mongoose = require("mongoose")

const BookingSchema = new mongoose.Schema({

    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
        listingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Listings"
        },
        hostId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },
        startDate: {
            type: String,
            required: true,
        },
        endDate: {
            type: String,
            required: true,
        },
    totalPrice: {
      type: Number,
      required: true,
    },

})

const Booking = new mongoose.model("Booking", BookingSchema)


module.exports = Booking