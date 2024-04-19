import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },
  reducers: {
    activeUser: (state, action) => {
      console.log("do something new", action.payload);
      state.value = action.payload;
    },
  },
});

export const { activeUser } = userSlice.actions;

export default userSlice.reducer;
