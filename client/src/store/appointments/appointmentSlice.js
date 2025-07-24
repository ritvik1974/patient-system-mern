import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { appointmentApi } from "../../constant/url";
import { submit } from "../../services/api";
const initialState = {
  appointments: [],
  loading: false,
  error: null,
  message: "",
};
export const getAppointments = createAsyncThunk(
  "profile/getAppointments",
  async (token, { rejectWithValue }) => {
    console.log("called ", "fetchProfileData");
    try {
      const response = await axios.get(`${appointmentApi}/myappointments`, {
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
export const submitAppointments = createAsyncThunk(
  "profile/submitAppointments",
  submit
);
const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    AppointmentNotFound: (state) => {
      state.appointments = [];
      state.error =
        "you have no appointments available make sure you have a appointment !";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
        // console.log(state.appointments);
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
    builder
      .addCase(submitAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(submitAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
  },
});

// Actions
export const { AppointmentNotFound } = appointmentSlice.actions;

// Reducer
export default appointmentSlice.reducer;
