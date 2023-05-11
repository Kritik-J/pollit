import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "@src/utils/constants/api";
import axios from "axios";

type IUser = {
  _id: string;
  name: string;
  userName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  role: string;
};

type AuthState = {
  isAuth: boolean;
  isLoading: boolean;
  isLoadingProfile: boolean;
  error: string | null;
  user: IUser | null;
};

const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  isLoadingProfile: false,
  error: null,
  user: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    {
      name,
      userName,
      email,
      password,
    }: {
      name: string;
      userName: string;
      email: string;
      password: string;
    },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/register`, {
        name,
        userName,
        email,
        password,
      });

      return data.user as IUser;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    {
      userNameOrEmail,
      password,
    }: { userNameOrEmail: string; password: string },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/auth/login`,

        {
          userNameOrEmail,
          password,
        }
      );

      return data.user as IUser;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${API_URL}/auth/logout`);

      if (data.status === "success") {
        return null;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getMyProfile = createAsyncThunk(
  "auth/getMyProfile",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${API_URL}/auth/profile`);

      return data.user as IUser;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
      state.user = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(getMyProfile.pending, (state) => {
      state.isLoadingProfile = true;
    });
    builder.addCase(getMyProfile.fulfilled, (state, action) => {
      state.isLoadingProfile = false;
      state.isAuth = true;
      state.user = action.payload;
    });
    builder.addCase(getMyProfile.rejected, (state, action) => {
      state.isLoadingProfile = false;
      state.isAuth = false;
      state.user = null;
      // state.error = action.payload as string;
    });
  },
});

export default authSlice.reducer;

export const { clearError } = authSlice.actions;
