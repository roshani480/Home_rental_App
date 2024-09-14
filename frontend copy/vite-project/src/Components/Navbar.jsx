import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Person } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/StateSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [displaydata, setDisplaydata] = useState([]); // This should be set with your data source
  const [dropdown, setDropdown] = useState(false);
  const user = useSelector((state) => state.user);

  return (
    <div className="flex items-center justify-center p-2 bg-gray-100 rounded-lg shadow-md">
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          className="p-2 text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 text-sm text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Search
        </button>

        <ul>
          {displaydata
            .filter((item) =>
              item.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((val) => {
              return <li key={val.id}> {val.title}</li>;
            })}
        </ul>
      </form>

      <button
        className="navbar_right_account"
        onClick={() => setDropdown(!dropdown)}
      >
        <Menu />
        {!user ? (
          <Person />
        ) : (
          <img
            src={`http://localhost:3000/${user.profileImagePath.replace(
              "public",
              ""
            )}`}
            alt="profile photo"
            style={{ objectFit: "cover", borderRadius: "50%" }}
          />
        )}
      </button>

      {dropdown && !user && (
        <div>
          <Link to="/login"> log in</Link>
          <Link to="/register"> sign up</Link>
        </div>
      )}

      {dropdown && user && (
        <div className="navbar_right_accountmenu">
          <Link to={`/${user._id}/trips`}>Trip List</Link>
          <Link to={`/${user._id}/wishList`}>Wish List</Link>
          <Link to={`/${user._id}/properties`}>Property List</Link>
          <Link to={`/${user._id}/reservations`}>Reservation List</Link>
          <Link to="/create-listing">Become A Host</Link>

          <Link
            to="/login"
            onClick={() => {
              dispatch(setLogout());
            }}
          >
            Log out
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
