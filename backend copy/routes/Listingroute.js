const router = require("express").Router();
const Listing = require("../models/Listing");

router.post("/create", async (req, res) => {
  try {
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      description,
      price,
      listingPhotoPaths,
    } = req.body;

    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      description,
      price,
      listingPhotoPaths,
    });

    await newListing.save();

    res.send(newListing);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

router.get("/search/:search", async (req, res) => {
  const { search } = req.params;

  try {
    let listings = [];

    if (search === "all") {
      listings = await Listing.find().populate("creator");
    } else {
      listings = await Listing.find({
        $or: [
          { category: { $regex: search, $options: "i" } }, // Regular Expressions, $options: "i" is for case sensitivity
          { title: { $regex: search, $options: "i" } },
        ],
      }).populate("creator");
    }

    res.status(200).json(listings);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: err.message });
    console.log(err);
  }
});

module.exports = router;
