import { createSlice } from "@reduxjs/toolkit";

type IUser = {};

type AuthState = {
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
  user: IUser | null;
};

const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  error: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
});

export default authSlice.reducer;

export const { clearError } = authSlice.actions;
