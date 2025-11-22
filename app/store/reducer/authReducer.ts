import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: null, // { _id, email, name, role, etc. }
};

const authSlice = createSlice({
  name: "authStore",
  initialState,
  reducers: {
    // ✅ Save user data
    login: (state, action) => {
      state.auth = action.payload;
    },
    // ✅ Clear on logout
    logout: (state) => {
      state.auth = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
