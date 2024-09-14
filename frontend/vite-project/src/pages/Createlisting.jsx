import React from "react";
import Navbar from "../Components/Navbar";
import { BiTrash } from "react-icons/bi";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import { categories, types, facilities } from "../data";
import "../styles/pages/Createlisting.scss";
import { useState } from "react";
import { IoIosImages } from "react-icons/io";

import { red } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Createlisting = () => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const user = useSelector((state) => state.user);
  const creatorId = user._id; // important to extract just id from user and not entire info other than id

  // function isValidObjectId(id) {
  //  return /^[a-fA-F0-9]{24}$/.test(id);
  //}

  //validating creatorId
  // console.log("creatorId:", creatorId);
  console.log("Is valid ObjectId:", isValidObjectId(creatorId));

  const navigate = useNavigate();

  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };

  /* BASIC COUNTS */
  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  //  STEP 2
  /* AMENITIES */
  const [amenities, setAmenities] = useState([]);

  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((option) => option !== facility)
      );
    } else {
      setAmenities((prev) => [...prev, facility]);
    }
  };

  /* UPLOAD, REMOVE PHOTOS */
  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (event) => {
    const files = Array.from(event.target.files);
    setPhotos((prevPhotos) => [...prevPhotos, ...files]);
  };

  const handleRemovePhoto = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  /* DESCRIPTION */
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0,
  });

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };

  const handlePost = async (e) => {
    e.preventDefault();

    //if (!isValidObjectId(creatorId)) {
    // console.log("Invalid creatorId format");
    // return;
    // }

    try {
      /* Create a new FormData onject to handle file uploads */
      const listingForm = new FormData();

      listingForm.append("creator", creatorId);
      listingForm.append("category", category);
      listingForm.append("type", type);
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("aptSuite", formLocation.aptSuite);
      listingForm.append("city", formLocation.city);
      listingForm.append("province", formLocation.province);
      listingForm.append("country", formLocation.country);
      listingForm.append("guestCount", guestCount);
      listingForm.append("bedroomCount", bedroomCount);
      listingForm.append("bedCount", bedCount);
      listingForm.append("bathroomCount", bathroomCount);
      listingForm.append("amenities", JSON.stringify(amenities));
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);
      listingForm.append("highlight", formDescription.highlight);
      listingForm.append("highlightDesc", formDescription.highlightDesc);
      listingForm.append("price", formDescription.price);

      /* Append each selected photos to the FormData object */
      photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo);
      });

      /* Send a POST request to server */
      const response = await fetch("http://localhost:8003/properties/create", {
        method: "POST",
        body: listingForm,
      });

      if (response.ok) {
        navigate("/");
        console.log("HI");
      }
    } catch (err) {
      console.log("Publish Listing failed", err.message);
    }
  };

  return (
    <>
      <form onSubmit={handlePost}>
        <Navbar />
        <div className="create-listing">
          <h1>Publish Your Place</h1>
        </div>
        <form></form>
        <div className="create-listing_step1">
          <h2>Step 1: Tell us about your place</h2>
          <hr />
          <h3>Which of these categories best describes your place?</h3>
          <div className="category-list">
            {categories?.map((item, index) => (
              <div
                className={`category ${
                  category === item.label ? "selected" : ""
                }`}
                key={index}
                onClick={() => setCategory(item.label)}
              >
                <div className="category_icon">{item.icon}</div>
                <p>{item.label}</p>
              </div>
            ))}
          </div>

          <h3>What type of place will guests have?</h3>
          <div className="type-list">
            {types?.map((item, index) => (
              <div
                className={`type ${type === item.name ? "selected" : ""}`}
                key={index}
                onClick={() => setType(item.name)}
              >
                <div className="type_text">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                </div>
                <div className="type_icon">{item.icon}</div>
              </div>
            ))}
          </div>

          <h3>Where's your place located?</h3>
          <div className="full">
            <div className="location">
              <p>Street Address</p>
              <input
                type="text"
                placeholder="Street Address"
                name="streetAddress"
                value={formLocation.streetAddress}
                onChange={handleChangeLocation}
                required
              />
            </div>
          </div>

          <div className="half">
            <div className="location">
              <p>Apartment, Suite, etc. (if applicable)</p>
              <input
                type="text"
                placeholder="Apt, Suite, etc. (if applicable)"
                name="aptSuite"
                value={formLocation.aptSuite}
                onChange={handleChangeLocation}
                required
              />
            </div>
            <div className="location">
              <p>City</p>
              <input
                type="text"
                placeholder="City"
                name="city"
                value={formLocation.city}
                onChange={handleChangeLocation}
                required
              />
            </div>
          </div>

          <div className="half">
            <div className="location">
              <p>Province</p>
              <input
                type="text"
                placeholder="Province"
                name="province"
                value={formLocation.province}
                onChange={handleChangeLocation}
                required
              />
            </div>
            <div className="location">
              <p>Country</p>
              <input
                type="text"
                placeholder="Country"
                name="country"
                value={formLocation.country}
                onChange={handleChangeLocation}
                required
              />
            </div>
          </div>

          <h3>Share some basics about your place</h3>
          <div className="basics">
            <div className="basic">
              <p>Guests</p>
              <div className="basic_count">
                <RemoveCircleOutline
                  onClick={() => {
                    guestCount > 1 && setGuestCount(guestCount - 1);
                  }}
                  sx={{
                    fontSize: "25px",
                    cursor: "pointer",
                    "&:hover": { color: red },
                  }}
                />
                <p>{guestCount}</p>
                <AddCircleOutline
                  onClick={() => {
                    setGuestCount(guestCount + 1);
                  }}
                  sx={{
                    fontSize: "25px",
                    cursor: "pointer",
                    "&:hover": { color: red },
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="basic">
          <p>Bedrooms</p>
          <div className="basic_count">
            <RemoveCircleOutline
              onClick={() => {
                bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
              }}
              sx={{
                fontSize: "25px",
                cursor: "pointer",
                "&:hover": { color: red },
              }}
            />
            <p>{bedroomCount}</p>
            <AddCircleOutline
              onClick={() => {
                setBedroomCount(bedroomCount + 1);
              }}
              sx={{
                fontSize: "25px",
                cursor: "pointer",
                "&:hover": { color: red },
              }}
            />
          </div>
        </div>

        <div className="basic">
          <p>Beds</p>
          <div className="basic_count">
            <RemoveCircleOutline
              onClick={() => {
                bedCount > 1 && setBedCount(bedCount - 1);
              }}
              sx={{
                fontSize: "25px",
                cursor: "pointer",
                "&:hover": { color: red },
              }}
            />
            <p>{bedCount}</p>
            <AddCircleOutline
              onClick={() => {
                setBedCount(bedCount + 1);
              }}
              sx={{
                fontSize: "25px",
                cursor: "pointer",
                "&:hover": { color: red },
              }}
            />
          </div>
        </div>

        <div className="basic">
          <p>Bathrooms</p>
          <div className="basic_count">
            <RemoveCircleOutline
              onClick={() => {
                bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
              }}
              sx={{
                fontSize: "25px",
                cursor: "pointer",
                "&:hover": { color: red },
              }}
            />
            <p>{bathroomCount}</p>
            <AddCircleOutline
              onClick={() => {
                setBathroomCount(bathroomCount + 1);
              }}
              sx={{
                fontSize: "25px",
                cursor: "pointer",
                "&:hover": { color: red },
              }}
            />
          </div>

          {/* Step 2 Started */}
          <div className="create-listing_step2">
            <h2>Step 2: Make your place stand out</h2>
            <hr />

            <h3>Tell guests what your place has to offer</h3>
            <div className="amenities">
              {facilities?.map((item, index) => (
                <div
                  className={`facility ${
                    amenities.includes(item.name) ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => handleSelectAmenities(item.name)}
                >
                  <div className="facility_icon">{item.icon}</div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          <h3>Add some photos of your place</h3>
          <div className="photos">
            {photos.length < 1 && (
              <>
                <input
                  id="image"
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleUploadPhotos}
                  multiple
                />
                <label htmlFor="image" className="alone">
                  <div className="icon">
                    <IoIosImages />
                  </div>
                  <p>Upload from your device</p>
                </label>
              </>
            )}

            {photos.length >= 1 && (
              <>
                {photos.map((photo, index) => (
                  <div key={index} className="photo">
                    <img src={URL.createObjectURL(photo)} alt="place" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(index)}
                    >
                      <BiTrash />
                    </button>
                  </div>
                ))}
                <input
                  id="image"
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleUploadPhotos}
                  multiple
                />
                <label htmlFor="image" className="together">
                  <div className="icon">
                    <IoIosImages />
                  </div>
                  <p>Upload from your device</p>
                </label>
              </>
            )}
          </div>

          <h3>What make your place attractive and exciting?</h3>
          <div className="description">
            <p>Title</p>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={formDescription.title}
              onChange={handleChangeDescription}
              required
            />
            <p>Description</p>
            <textarea
              type="text"
              placeholder="Description"
              name="description"
              value={formDescription.description}
              onChange={handleChangeDescription}
              required
            />
            <p>Highlight</p>
            <input
              type="text"
              placeholder="Highlight"
              name="highlight"
              value={formDescription.highlight}
              onChange={handleChangeDescription}
              required
            />
            <p>Highlight details</p>
            <textarea
              type="text"
              placeholder="Highlight details"
              name="highlightDesc"
              value={formDescription.highlightDesc}
              onChange={handleChangeDescription}
              required
            />
            <p>Now, set your PRICE</p>
            <span>$</span>
            <input
              type="number"
              placeholder="100"
              name="price"
              value={formDescription.price}
              onChange={handleChangeDescription}
              className="price"
              required
            />
          </div>
        </div>

        <button className="submit_btn" type="submit">
          CREATE YOUR LISTING
        </button>
      </form>
    </>
  );
};

export default Createlisting;

function isValidObjectId(id) {
  return /^[a-fA-F0-9]{24}$/.test(id);
}
