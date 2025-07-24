import React from "react";
import { FiX } from "react-icons/fi";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-11/12 max-w-lg rounded-[20px] shadow-2xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FiX color="red" size={30} />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

export const ModelComponent = ({ title, summary, contactNumber = "" }) => (
  <div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{summary}</p>
    {contactNumber && (
      <div className="text-gray-600 mt-4 ml-2">
        Contact No : {contactNumber}
      </div>
    )}
  </div>
);
