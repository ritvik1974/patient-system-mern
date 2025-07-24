import appointmentReducer from "./appointments/appointmentSlice";
import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profile/profileReducer";
const store = configureStore({
  reducer: {
    userAppointments: appointmentReducer,
    profile: profileReducer,
  },
});

export default store;
