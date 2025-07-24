import axios from "axios";
import { appointmentApi } from "../constant/url";

export const submit = async (data, { rejectWithValue }) => {
  const { file, date, time, department, comments, doctor, name } = data;

  const formData = new FormData();
  if (file) {
    formData.append("file", file); // Ensure field name matches multer setup
  }
  formData.append("date", date); // Convert Date to ISO string
  formData.append("time", time); // Ensure time is in a valid string format
  formData.append("name", name); // Ensure time is in a valid string format
  formData.append("department", department);
  formData.append("comments", comments);
  formData.append("doctor", JSON.stringify(doctor)); // Serialize doctor if it's an object

  // Debug: Check if formData is populated
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    const response = await axios.post(
      `${appointmentApi}/book`,
      formData, // Correctly passing the request body
      {
        headers: {
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
};
