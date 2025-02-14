import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    role:"",
    token:""
  },
  reducers: {
    LoginUser: (state, action) => {
      state.role = action.payload.role;
      state.token = action.payload.token;
    },
    logoutUser:(state, action)=>{
      state.role = "";
      state.token = "";
    }
  },
});

export const { LoginUser,logoutUser } = AuthSlice.actions;
export default AuthSlice.reducer;
