import { categories } from "../data";
import { useState, useEffect } from "react";
import "../styles/pages/Listing.scss";
import { setListings } from "../redux/StateSlice";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Components/Loader";
import Listingcard from "./Listingcard";

import React from "react";

const Listings = () => {
  // States
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const listings = useSelector((state) => state.listings);

  const dispatch = useDispatch();

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `http://localhost:8003/properties?category=${selectedCategory}`
          : `http://localhost:8003/properties`,

        {
          method: "GET",
        }
      );

      const data = await response.json();

      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log(`Fetch Listings Failed: ${err}`);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);

  console.log(listings);

  return (
    <>
      <div className="category-list">
        {categories?.map((category, index) => (
          <div
            className={`category ${
              category.label === selectedCategory ? "active" : ""
            }`}
            key={index}
            onClick={() => {
              setSelectedCategory(category.label);
            }}
          >
            <div className="category_icon">{category.icon}</div>
            <p>{category.label}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {listings.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking = false,
            }) => (
              <Listingcard
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default Listings;
