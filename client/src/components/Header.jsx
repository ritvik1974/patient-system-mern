import React from "react";
import SideBar from "../ui/sideBar";
import { FiMenu, FiUserCheck, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../store/profile/profileReducer";
import { Link } from "react-router-dom";
export default function Header() {
  const dispatch = useDispatch(); // dispatcher toggles sidebar
  const menu = useSelector((state) => state.profile.sideBar); // get current state
  return (
    <div className="app-container">
      <header className="bg-purple-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <button className="ml-6" onClick={() => dispatch(toggleSideBar())}>
            {!menu ? <FiMenu size={30} /> : <FiX size={30} />}
          </button>
        </div>
        <Link to="/">
          <h1
            className="md:hidden text-white flex justify-center gap-1 items-center  text-[1.1rem] 
      "
          >
            <span>
              <FiUserCheck />{" "}
            </span>
            <span>EaSY-DOc</span>
          </h1>
        </Link>
        <nav className="hidden md:flex space-x-2">
          <Link
            to="/"
            className="bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-100 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/services"
            className="bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-100 transition-colors"
          >
            Services
          </Link>

          <Link
            to="/book-appontment"
            className="bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-100 transition-colors"
          >
            Book an appointment
          </Link>
          <a
            href="/appointments"
            className="bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-100 transition-colors"
          >
            My appointment
          </a>
        </nav>
      </header>
      <aside className={`sidebar ${menu ? "open" : "closed"} `}>
        <SideBar />
      </aside>
    </div>
  );
}
