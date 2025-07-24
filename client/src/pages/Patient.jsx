// PatientPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { authApi } from "../auth/config";

const PatientPage = () => {
  const [showPasscodePrompt, setShowPasscodePrompt] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [erorr, setErorr] = useState(false);
  const [patients, setPatients] = useState(null);

  // Hardcoded passcode for demonstration purposes. Replace this with your logic.
  const correctPasscode = "1234";

  const handleButtonClick = () => {
    setShowPasscodePrompt(true);
  };

  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    if (passcode === correctPasscode) {
      setIsAuthorized(true);
    } else {
      setErorr(!erorr);
    }
  };

  // Fetch the patient list if authorized
  useEffect(() => {
    if (isAuthorized) {
      const fetchPatients = async () => {
        try {
          const response = await axios.get(`${authApi}/patient`);
          console.log(response.data); // Replace with your API endpoint
          setPatients(response.data.users); // Assuming response data is an array of patient objects with a 'name' field
        } catch (error) {
          console.error("Error fetching patients:", error);
        }
      };

      fetchPatients();
    }
  }, [isAuthorized]);
  const getUsername = (user) => {
    const userName = user.split("@")[0];
    return userName;
  };
  return (
    <div className="patient-page-container p-4">
      {!isAuthorized && (
        <>
          <button
            onClick={handleButtonClick}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Patients
          </button>

          {showPasscodePrompt && (
            <form onSubmit={handlePasscodeSubmit} className="mt-4">
              <label className="block text-gray-700">
                Enter Passcode:
                <input
                  type="password"
                  placeholder="like 1 2 3 4"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="border border-gray-300 p-2 mt-2 rounded-md w-full"
                />
              </label>
              {erorr && (
                <p className="text-red-500 font-semibold text-sm">
                  Try- 1 2 3 4 without any sapce !
                </p>
              )}
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md mt-2"
              >
                Submit
              </button>
            </form>
          )}
        </>
      )}

      {isAuthorized && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Patient List</h2>
          <div className="flex items-start justify-center flex-col">
            <hr className="h-1 w-[70%] border-b-4" />
            {patients?.map((patient, index) => (
              <>
                <ul
                  key={index}
                  className="text-gray-800 flex gap-2 md:gap-4 pb-2 "
                >
                  <li>
                    User Name:<strong> {getUsername(patient.email)}</strong>
                  </li>

                  <li>
                    Email: <strong>{patient.email}</strong>
                  </li>
                  <li>
                    Patient ID: <strong>{patient._id}</strong>
                  </li>
                </ul>
                <hr className="h-1 w-[70%] border-b-4" />
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientPage;
