import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
  token: localStorage.getItem("token") || null,
  isAuth: localStorage.getItem("token") ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state,action) => {
      const dummyToken = "dummy_token_12345"; 
      state.user = action.payload.user;
      state.token = dummyToken;
      state.isAuth = true;

      localStorage.setItem("token", dummyToken);
    },

    logout: (state) => {
        
      state.token = null;
      state.isAuth = false;

      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
