const router = require("express").Router();

const Users = require("../models/Usermodel");
const Listing = require("../models/Listing");
const Booking = require("../models/Booking")

// Add Listing to Wishlist
router.patch("/:userId/:listingId", async (req, res) => {
  try {
    const { userId, listingId } = req.params;

    //Does these fields exists in database?
    const user = await Users.findById(userId); // Roshni
    const listing = await Listing.findById(listingId).populate("creator");
    console.log(user);
    console.log(listing);

    const favouriteListing = user.wishlist.find((item) => item == listingId);

    console.log(favouriteListing);

    // user.wishlist = 668044ba351edd1221df7129

    if (favouriteListing) {
      user.wishlist = user.wishlist.filter((item) => item !== listingId);
      await user.save();
      res.status(200).json({
        message: "Listing is removed from wish list",
        wishlist: user.wishlist,
      });
    } else {
      user.wishlist.push(listingId);
      await user.save();
      res.status(200).json({
        message: "Listing is added to wish list",
        wishlist: user.wishlist,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message });
  }
});


//Adding tripList from booking
router.get("/:userId/trips", async(req,res) =>{

  const userId = req.params

const tripList = await Booking.findById({userId})

res.send(tripList)

})

router.get("/")

module.exports = router;
