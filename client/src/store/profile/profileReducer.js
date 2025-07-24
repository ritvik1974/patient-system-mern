import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { authApi } from "../../auth/config";

// Initial State
const initialState = {
  img: "",
  sideBar: false,
  token: "",
  userName: "",
  userId: "",
  message: "",
  patient: false,
  firstName: "",
  lastName: "",
  phone: "",
  addr1: "",
  addr2: "",
  city: "",
  _state: "",
  zipcode: "",
  updated: false,
  email: "",
};

// Async Thunks

// Fetch profile data
export const fetchProfileData = createAsyncThunk(
  "profile/fetchData",
  async (token, { rejectWithValue }) => {
    // console.log("called ", "fetchProfileData");
    try {
      const response = await axios.get(`${authApi}/profile`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return the fetched profile data
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Update profile data
// Update profile data
export const profileData = createAsyncThunk(
  "profile/ProfileData",
  async (data, { rejectWithValue }) => {
    // console.log(data);

    try {
      const response = await axios.post(
        `${authApi}/profile`,
        data, // Correctly passing the request body
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${data.token}`,
          },
        }
      );
      return response.data; // Return the updated profile data
    } catch (error) {
      console.error("Failed to update profile data:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Profile Slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUseridAndToken: (state, action) => {
      // console.log(action.payload);
      const { userId, token, email } = action.payload;
      state.token = token;
      state.userId = userId;
      state.userName = "@" + email?.substring(0, email.length - 10);
      state.email = email;
    },
    toggleSideBar: (state) => {
      state.sideBar = !state.sideBar;
    },
    updateUser: (state) => {
      state.updated = !state.updated;
    },
    isPatientActive: (state) => {
      state.patient = !state.patient;
    },
    logoutUser: (state) => {
      localStorage.clear("userdata");
      state.img = "";
      state.sideBar = false;
      state.token = "";
      state.userId = "";
    },
    updateImageAfterUserLogin: (state, action) => {
      state.img = action.payload.img;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfileData.fulfilled, (state, action) => {
      const {
        firstName,
        lastName,
        phone,
        addr1,
        addr2,
        city,
        _state,
        zipcode,
        email,
        updated,
      } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.phone = phone;
      state.addr1 = addr1;
      state.addr2 = addr2;
      state.city = city;
      state._state = _state;
      state.zipcode = zipcode;
      state.email = email;
      state.updated = updated;
    });
    builder.addCase(profileData.fulfilled, (state, action) => {
      state.message = action.payload?.message;
      state.updated = true;
    });
  },
});

// Actions
export const {
  setUseridAndToken,
  logoutUser,
  updateImageAfterUserLogin,
  toggleSideBar,
  setUser,
  isPatientActive,
  updateUser,
} = profileSlice.actions;

// Reducer
export default profileSlice.reducer;
