import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks
import Profile from "../components/Profile"; // Importing the Profile component for user profile display
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "../ui"; // Importing UI components from the project
import { useState } from "react"; // Importing useState to manage local component state
import { profileData } from "../store/profile/profileReducer"; // Action creator for updating profile data
import { toast, ToastContainer } from "react-toastify"; // Toast notifications for user feedback
import "react-toastify/dist/ReactToastify.css"; // Toastify's CSS for styling notifications

// Main Dashboard component for displaying and updating user profile information
export default function Dashboard() {
  // Retrieving the user profile data from the Redux store
  const user = useSelector((state) => state.profile);

  // Local state to manage form data with default empty fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    addr1: "",
    addr2: "",
    city: "",
    _state: "",
    zipcode: "",
    error: "", // Error field to display any validation messages
  });

  // Setting up a dispatch function to send actions to the Redux store
  const dispatch = useDispatch();

  // Handler to update form state as the user types into the input fields
  const handlechange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value }); // Update corresponding field in formData
  };

  // Handler for form submission
  const handleFormData = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    // Form validation to check if all required fields are filled in
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.addr1 ||
      !formData.addr2 ||
      !formData.city ||
      !formData._state
    ) {
      // Displaying an error toast notification if validation fails
      toast.error("All fields marked with * are required!", {
        position: "top-right",
      });
      // Updating form state with an error message
      setFormData({ ...formData, error: "Error - All fields are required" });
      return; // Early exit if validation fails
    }

    // Creating a profile object to send to the Redux store
    const profile = {
      ...formData, // Including all form data
      token: user.token, // Including user-specific token from Redux state
      userId: user.userId, // Including user ID from Redux state
      updated: true, // Marking the profile as updated
      // Generating an email address using the user's userName
      email: user.userName.substring(1, user.userName.length) + "@gmail.com",
    };

    // Dispatching the profileData action to update the Redux state
    dispatch(profileData(profile));
    // Displaying a success toast notification
    toast.success("Updating user profile!", { position: "top-right" });

    // Resetting the form fields to their initial state
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      addr1: "",
      addr2: "",
      city: "",
      _state: "",
      zipcode: "",
      error: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header for the Patient Dashboard */}
      <h1 className="text-2xl border-[1px] border-b-black font-bold shadow-md bg-white py-4 pl-4">
        Patient Dashboard
      </h1>

      {/* Conditional rendering based on whether the user profile is updated */}
      {!user.updated ? (
        // Displaying the Card component with a form for entering patient details
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>
              Patient Details {/* Displaying any form validation errors */}
              <span className="text-red-700 text-xl font-bold font-serif ml-6">
                {formData.error}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormData}>
              <div className="grid grid-cols-2 gap-4">
                {/* First Name input field */}
                <div>
                  <Label htmlFor="firstName">First Name*</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handlechange}
                  />
                </div>
                {/* Last Name input field */}
                <div>
                  <Label htmlFor="lastName">Last Name*</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handlechange}
                  />
                </div>
              </div>
              {/* Phone input field */}
              <div>
                <Label htmlFor="phone">Phone*</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handlechange}
                />
              </div>
              {/* Read-only Email input field */}
              <div>
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  disabled={user.userName}
                  readOnly
                  value={
                    user.userName
                      ? `${user.userName.substring(1)}@gmail.com`
                      : ""
                  }
                  placeholder="Email"
                />
              </div>
              {/* Address Line 1 input field */}
              <div>
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input
                  id="addressLine1"
                  name="addr1"
                  placeholder="Address Line 1"
                  value={formData.addr1}
                  onChange={handlechange}
                />
              </div>
              {/* Address Line 2 input field */}
              <div>
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input
                  id="addressLine2"
                  name="addr2"
                  placeholder="Address Line 2"
                  value={formData.addr2}
                  onChange={handlechange}
                />
              </div>
              {/* Grid for City, State, and Zipcode inputs */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City*</Label>
                  <Input
                    id="city"
                    placeholder="City"
                    name="city"
                    value={formData.city}
                    onChange={handlechange}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="State"
                    name="_state"
                    value={formData._state}
                    onChange={handlechange}
                  />
                </div>
                <div>
                  <Label htmlFor="zipcode">Zipcode</Label>
                  <Input
                    id="zipcode"
                    placeholder="Zipcode"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={handlechange}
                  />
                </div>
              </div>
              {/* Submit button for the form */}
              <Button
                className="bg-purple-600 hover:bg-purple-700 w-20 mt-4 px-2 ml-1"
                type="submit"
              >
                ADD
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        // Displaying the Profile component if the user profile is updated
        <Profile />
      )}
      {/* Container for toast notifications */}
      <ToastContainer />
    </div>
  );
}
