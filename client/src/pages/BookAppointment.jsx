import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker"; // Importing DatePicker component
import "react-datepicker/dist/react-datepicker.css"; // Importing DatePicker styles
import useDateTime from "../hooks/useDateTime"; // Custom hook for handling date and time
import { useDispatch, useSelector } from "react-redux";
import { submitAppointments } from "../store/appointments/appointmentSlice"; // Action to submit appointments
import { departments, doctors } from "../constant/data"; // Department and doctor data (assumed to be pre-defined)
import { toast, ToastContainer } from "react-toastify"; // For displaying toast notifications
import "react-toastify/dist/ReactToastify.css"; // Importing Toastify styles

const BookAppointment = () => {
  // Getting user details from Redux store
  const user = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  // Using custom hook to get date and time values
  const { date, time, getDateTime } = useDateTime();

  // State variables for form inputs
  const [selectedDate, setSelectedDate] = useState(new Date()); // For storing selected date
  const [department, setDepartment] = useState(""); // Selected department
  const [doctor, setDoctor] = useState(""); // Selected doctor
  const [comments, setComments] = useState(""); // Comments input
  const fileInputRef = useRef(null); // Reference to file input element
  const isLoading = useSelector((state) => state.userAppointments.loading); // Check if the form is in loading state

  // Function to validate file type (only allows JPEG and PNG)
  const validateFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    return file && allowedTypes.includes(file.type);
  };

  // Validation function to ensure required fields are filled and valid
  const isValidForm = () => {
    const selectedFile = fileInputRef.current.files[0]; // Getting selected file

    // Check if required fields are filled and valid
    if (!date || !time || !department || !comments || !selectedFile) {
      toast.error("Please fill out all required fields!", {
        position: "top-center",
      });
      return false;
    }
    if (!validateFile(selectedFile)) {
      toast.error("Invalid file type. Please upload JPEG or PNG images.", {
        position: "top-center",
      });
      return false;
    }
    if (comments.length <= 6) {
      toast.error("Comments should be at least 6 characters long", {
        position: "top-center",
      });
      return false;
    }
    return true;
  };

  // Effect hook to update date and time when selectedDate changes
  useEffect(() => {
    getDateTime(selectedDate);
  }, [selectedDate, getDateTime]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate form before submission
    if (!isValidForm()) return;

    const selectedFile = fileInputRef.current.files[0]; // Get the selected file

    // Create a new appointment object with all required data
    const newAppointment = {
      token: user.token, // Adding user token
      date: date,
      time: time,
      department,
      doctor: doctors[department], // Getting doctor based on selected department
      comments,
      file: selectedFile, // Adding file to the form data
      name: user.firstName, // Adding user's first name
    };

    // Dispatch the action to submit the appointment
    dispatch(submitAppointments(newAppointment));

    // Display success toast message
    toast.success("Appointment created successfully!", {
      position: "top-center",
    });

    // Reset form fields after successful submission
    setComments("");
    setDepartment("");
    setDoctor("");
    setSelectedDate(new Date());

    // Clear the file input field using the reference
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex justify-center items-center md:items-baseline md:pt-10 min-h-screen bg-gray-100">
      <div className="bg-white px-8 py-2 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-1">
          Book an Appointment
        </h2>

        {/* Form for booking appointment */}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Date Picker for selecting appointment date */}
          <div className="mb-1">
            <label className="block text-gray-700 font-medium mb-1">
              Select Date*
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-200"
            />
          </div>

          {/* Dropdown for selecting department */}
          <div className="mb-1">
            <label className="block text-gray-700 font-medium mb-1">
              Department*
            </label>
            <select
              required
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
            >
              <option value="">Select Department</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept.value}>
                  {dept.label}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown for selecting doctor */}
          <div className="mb-1">
            <label className="block text-gray-700 font-medium mb-1">
              Doctor*
            </label>
            <select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
              disabled={true} // Disabled as doctor is auto-selected based on department
            >
              <option value={department && doctors[department][0]}>
                {department && doctors[department].name}
              </option>
            </select>
          </div>

          {/* File upload for uploading medical reports */}
          <div className="mb-1">
            <label className="block text-gray-700 font-medium mb-1">
              Upload Reports*
            </label>
            <input
              ref={fileInputRef}
              accept="image/jpeg, image/png"
              required
              type="file"
              name="uploaded_file"
              className="block w-full text-sm text-gray-500 file:ml-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
          </div>

          {/* Text area for adding comments */}
          <div className="mb-2">
            <label className="block text-gray-700 font-medium mb-1">
              Comments*
            </label>
            <textarea
              required
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Explain about the problem"
              rows="3"
            />
          </div>

          {/* Submit button to book appointment */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
      <ToastContainer /> {/* Container to display toast notifications */}
    </div>
  );
};

export default BookAppointment;
