import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/profile/profileReducer";

const Profile = () => {
  const profile = useSelector((state) => state.profile); // get the profile from store
  const dispatch = useDispatch(); // dispatcher to update profile
  return (
    <div className="profile-container p-4 md:max-w-[30rem]">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="profile-details bg-white shadow-md p-4 rounded-md font-sans">
        <p className=" underline ">
          <strong>First Name:</strong> {profile.firstName}
        </p>
        <p className=" underline ">
          <strong>Last Name:</strong> {profile.lastName}
        </p>
        <p className=" underline ">
          <strong>Email:</strong> {profile.email}
        </p>
        <p className=" underline ">
          <strong>Phone:</strong> {profile.phone}
        </p>
        <p className=" underline ">
          <strong>Address Line 1:</strong> {profile.addr1}
        </p>
        <p className=" underline ">
          <strong>Address Line 2:</strong> {profile.addr2}
        </p>
        <p className=" underline ">
          <strong>City:</strong> {profile.city}
        </p>
        <p className=" underline ">
          <strong>State:</strong> {profile._state}
        </p>
        <p className=" underline ">
          <strong>Zipcode:</strong> {profile.zipcode}
        </p>
        <button
          className=" mt-4 w-40 text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
          onClick={() => dispatch(updateUser())}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
