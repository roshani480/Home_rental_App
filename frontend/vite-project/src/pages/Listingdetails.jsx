import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DateRange } from "react-date-range";
import "../styles/Listingdetail.scss";
import { facilities } from "../data";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";

const Listingdetails = () => {
  const [detail, setDetail] = useState({
    title: "",
    type: "",
    city: "",
    province: "",
    country: "",
    guestCount: 0,
    bedroomCount: 0,
    bedCount: 0,
    bathroomCount: 0,
    description: "",
    highlight: "",
    highlightDesc: "",
    amenities: [],
    price: 0,
    creator: null,
  });

  const { listingId } = useParams();
  const navigate = useNavigate();
  const customerId = useSelector((state) => state.user?._id);

  useEffect(() => {
    getDetails();
  }, [listingId]);

  const getDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8003/properties/${listingId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Error fetching property details: ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("API Response:", data);
      setDetail(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24));

  const handleSubmit = async () => {
    console.log("inside handleSubmit");
    console.log("creatordetails", detail.creator);

    if (!detail.creator || !detail.creator._id) {
      console.log("Creator information is missing.");
      return;
    }

    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: detail.creator._id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: detail.price * dayCount,
      };

      console.log("Booking form:", bookingForm);

      const response = await fetch("http://localhost:8003/Bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Booking created successfully", responseData);
        navigate(`/${customerId}/trips`);
      } else {
        const errorData = await response.json();
        console.error(`Error creating booking: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Submit Booking failed", err);
    }
  };

  return (
    <div>
      <div className="listing-details">
        <div className="title">
          <h1>{detail.title}</h1>
          <div></div>
        </div>
        <h2>
          {detail.type} in {detail.city}, {detail.province}, {detail.country}
        </h2>
        <p>
          {detail.guestCount} guests - {detail.bedroomCount} bedroom(s) -{" "}
          {detail.bedCount} bed(s) - {detail.bathroomCount} bathroom(s)
        </p>
        <hr />
        <h3>Description</h3>
        <p>{detail.description}</p>
        <hr />
        <h3>{detail.highlight}</h3>
        <p>{detail.highlightDesc}</p>
        <hr />
        <div className="booking">
          <div>
            <h2>What this place offers?</h2>
            <div className="amenities">
              {detail.amenities.map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {detail.city}
        </div>
        <div className="date-range-calender">
          <DateRange ranges={dateRange} onChange={handleSelect} />
          {dayCount > 1 ? (
            <h2>
              ${detail.price} x {dayCount} nights
            </h2>
          ) : (
            <h2>
              ${detail.price} x {dayCount} night
            </h2>
          )}

          <h2>Total price: ${detail.price * dayCount}</h2>
          <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
          <p>End Date: {dateRange[0].endDate.toDateString()}</p>

          <button className="button" type="button" onClick={handleSubmit}>
            BOOKING
          </button>
        </div>
      </div>
    </div>
  );
};

export default Listingdetails;
