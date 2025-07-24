import React from "react";
import { useSelector } from "react-redux";

const AppointmentCard = ({ appointment }) => {
  // sestructures all the properties for dispaly on ui
  const { date, doctor, name, department, img } = appointment;
  // console.log(appointment);
  // Converting the image buffer to base64
  const base64Image = img; // flag this image is a base64
  const doc = { ...JSON.parse(doctor) }; // flag this image is a base64

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80 m-4">
      <div className="flex justify-end p-2 bg-white">
        <p className="text-blue-500 text-sm">
          {new Date(date).toLocaleDateString()}
        </p>
      </div>
      {img ? (
        <img
          src={base64Image}
          alt="Uploaded Report"
          className="w-full h-32 object-cover"
        />
      ) : (
        <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
          <img
            src="/default.jpg"
            alt="default"
            title="no image provided"
            className=" w-full h-32 object-cover"
          />
        </div>
      )}
      <div className="p-4 bg-blue-600 text-white">
        <h3 className="text-lg font-semibold">Doctor Details</h3>
        <p>
          <strong>Name:</strong> {doc?.name}
        </p>
        <p>
          <strong>Department:</strong> {department}
        </p>
        <p>
          <strong>Rating:</strong> {doc?.rating}
        </p>

        <button className="bg-white text-blue-600 rounded-lg px-4 py-2 font-bold mt-4 hover:bg-blue-500 hover:text-white">
          JOIN
        </button>

        <p className="mt-4 text-lg font-bold text-center">
          PATIENT NAME: {name}
        </p>
      </div>
    </div>
  );
};

const MyAppointments = () => {
  const user = useSelector((state) => state.userAppointments.appointments);
  console.log(user);
  return (
    <div className="flex flex-wrap justify-center">
      {user.map((appointment, index) => (
        <AppointmentCard key={index} appointment={appointment} />
      ))}
    </div>
  );
};

export default MyAppointments;
