import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the slice
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

// Create the auth slice using createSlice function
const authSlice = createSlice({
  name: "auth", // Specify the name of the slice
  initialState, // Set the initial state
  reducers: {
    // Define the setCredentials reducer
    setCredentials: (state, action) => {
      // Update the userInfo state with the payload
      state.userInfo = action.payload;
      // Store the userInfo in localStorage as a string
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
  },
});

// Export the setCredentials action creator
export const { setCredentials } = authSlice.actions;

// Export the auth reducer
export default authSlice.reducer;
