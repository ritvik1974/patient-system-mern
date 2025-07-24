import axios from "axios";
import { authApi } from "./config";
// api calls for authentication
// using axios login/signup
const signup = async (formData) => {
  try {
    const res = await axios.post(`${authApi}/register`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Signup successful", res.data);
    return res.data;
  } catch (err) {
    // console.log(err.response.data);
    return err.response; // This should include the error message if failed
  }
};

const login = async (formData) => {
  try {
    const res = await axios.post(`${authApi}/login`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Login successful", res.data);
    return res.data; // This should include the token if successful
  } catch (err) {
    // console.error(
    //   "Login failed",
    //   err.response ? err.response.data : err.message
    // );
    // console.log(err);
    // return { message: err.response ? err.response.data : err.message };
    return err.response;
  }
};
export { login, signup };
