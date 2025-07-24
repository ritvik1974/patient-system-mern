import React, { useState } from "react";
import { FiUser, FiHeart, FiUserCheck, FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";

function Sidebar() {
  const user = useSelector((state) => state.profile);
  const [userImage, setUserImage] = useState("/user.jpg");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`min-h-screen absolute top-0 left-0 bg-white
         shadow-2xl cursor-pointer max-w-[13rem]`}
    >
      <h1
        className="text-purple-800 flex justify-center gap-2 items-center mt-4 p-1 text-xl pb-4
      "
      >
        <span>
          <FiUserCheck />{" "}
        </span>
        <span>EaSY-DOc</span>
      </h1>
      <hr />
      <ul
        className="flex flex-col w-[12rem] justify-center items-center gap-1 pt-12 my-2
       text-[#221f1f] font-normal text-xl"
      >
        <div className="relative">
          <li
            className="h-[80px] w-[80px] rounded-[100%] bg-gray-800 
             shadow-2xl overflow-hidden border-[4px] border-blue-600"
          >
            <img
              src={userImage}
              alt="user"
              className="object-cover h-full w-full"
            />
          </li>
          <label
            htmlFor="imageUpload"
            className="absolute bottom-2 -right-2 bg-white p-1 rounded-full cursor-pointer border border-gray-300"
          >
            <FiEdit size={20} color="black" />
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <li className="text-sm font-bold text-[#37176b]">
          {(user.firstName + " " + user.lastName).toUpperCase()}
        </li>
        <li className="text-sm font-sans text-[#801414]">{user.userName}</li>
        <a
          href="/patient"
          className="flex items-center gap-1 px-8 py-1 mt-2 rounded-full bg-blue-950 text-white border-none outline-none hover:bg-black hover:font-bold"
        >
          <FiHeart />
          <span>Patient</span>
        </a>
        <li>
          <button
            onClick={() => {
              localStorage.removeItem("userdata");
              window.location.href = "/";
              window.location.reload(); // Refresh the page to remove the token from the local storage and redirect to the login page.
            }}
            className="flex items-center gap-1 px-8 py-1 mt-2  rounded-full border-[1px] border-black hover:bg-black hover:text-white hover:font-bold"
          >
            <FiUser />
            <span>Logout</span>
          </button>
        </li>
      </ul>

      <nav className="flex md:hidden flex-col font-black ">
        <a
          href="/services"
          className="bg-white text-purple-600 px-4 py-2 rounded-full text-sm  hover:bg-purple-100 transition-colors"
        >
          Services
        </a>
        <a
          href="/book-appontment"
          className="bg-white text-purple-600 px-4 py-2 rounded-full text-sm  hover:bg-purple-100 transition-colors"
        >
          Book an appointment
        </a>
        <a
          href="/appointments"
          className="bg-white text-purple-600 px-4 py-2 rounded-full text-sm  hover:bg-purple-100 transition-colors"
        >
          My appointment
        </a>
      </nav>
    </div>
  );
}

export default Sidebar;
