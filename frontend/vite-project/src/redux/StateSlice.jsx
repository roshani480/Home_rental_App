import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setListings: (state, action) => {
      state.listings = action.payload.listings;
    },
    setWishlist: (state, action) => {
      if (state.user) {
        state.user.wishlist = action.payload.wishlist;
      }
    },
    setTriplist: (state,action) => {
      state.user.triplist = action.payload.triplist
    }
  },
});

export const { setLogin, setLogout, setListings, setWishlist, setTriplist } =
  userSlice.actions;
export default userSlice.reducer;
