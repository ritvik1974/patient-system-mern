import React, { useState } from "react";
import Modal from "../ui/Model"; // Assuming the modal component is in this path
import { healthcareServices } from "../constant/data"; // Assuming the object is in this path
import { ModelComponent } from "../ui/Model"; // Importing ModelComponent

function Services() {
  // initialize states
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalSummary, setModalSummary] = useState("");
  const [modalContact, setModalContact] = useState("");
  // handle the modal contents
  const openModal = (service) => {
    setModalTitle(service.title);
    setModalSummary(service.summary);
    setModalContact(service.contactNumber);
    setIsOpen(true);
  };
  // toggle the modal
  const closeModal = () => {
    setIsOpen(false);
    setModalTitle("");
    setModalSummary("");
    setModalContact("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Service Cards */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.keys(healthcareServices).map((serviceKey) => (
            <div
              key={serviceKey}
              className="bg-gray-300 p-8 text-center text-lg font-semibold rounded-lg cursor-pointer"
              onClick={() => openModal(healthcareServices[serviceKey])}
            >
              {healthcareServices[serviceKey].title}
            </div>
          ))}
        </div>
      </div>
      {/* Modal Component */}
      <Modal isOpen={isOpen} onClose={closeModal} title={modalTitle}>
        <ModelComponent
          title={modalTitle}
          summary={modalSummary}
          contactNumber={modalContact}
        />
      </Modal>
    </div>
  );
}

export default Services;
