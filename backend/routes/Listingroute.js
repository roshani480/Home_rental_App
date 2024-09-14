const Listing = require("../models/Listing");
const multer = require("multer");

const router = require("express").Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  //upload.array("listingPhotos")
  try {
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;

    const listingPhotos = req.files;

    if (!listingPhotos) {
      return res.status(400).send("No file uploaded!");
    }

    const listingPhotoPaths = listingPhotos.map((file) => file.path);

    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      listingPhotoPaths,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    });
    await newListing.save();

    // Instead of sending this newListing data from another router
    // We are storing and sending it to frontend from this route
    res.status(200).json(newListing);
  } catch (error) {
    res
      .status(409)
      .json({ message: "Fail to create Listing", error: error.message });
    console.log(error);
  }
});

// Get listings data
router.get("/", async (req, res) => {
  const qCategory = req.query.category; // All

  try {
    let listings;

    if (qCategory) {
      // qcategory can be: Windmills etc
      listings = await Listing.find({ category: qCategory }).populate(
        "creator"
      );
    } else {
      // This will give All the data
      listings = await Listing.find().populate("creator");
    }

    res.status(200).json(listings);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: err.message });
  }
});

router.get("/:listingId", async (req, res) => {
  const { listingId } = req.params;

  
  const listing = await Listing.findById(listingId).populate("creator");

  res.send(listing);
});

module.exports = router;
