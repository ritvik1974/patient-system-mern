import React, { useState } from "react";
import { ModelComponent } from "../ui/Model";
import Modal from "../ui/Model";
import { modalData } from "../constant/data";
export default function Footer() {
  // states
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  //  handling modal content
  const openModal = (content, title) => {
    setModalContent(content);
    setModalTitle(title);
    setIsOpen(true);
  };
  // toggle modal content
  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
    setModalTitle("");
  };
  const currentYear = new Date().getFullYear(); // default date

  return (
    <>
      <footer className="bg-purple-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-semibold">EaSY-DOc</h2>
              <p className="text-sm">
                Caring for your health, every step of the way
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end md:gap-3 gap-2">
              <button
                onClick={() =>
                  openModal(
                    <ModelComponent
                      title={modalData.aboutUs.title}
                      summary={modalData.aboutUs.summary}
                    />,
                    "About Us"
                  )
                }
                className="text-white font-sans font-semibold hover:underline"
              >
                About Us
              </button>
              <button
                onClick={() =>
                  openModal(
                    <ModelComponent
                      title={modalData.contact.title}
                      summary={modalData.contact.summary}
                    />,
                    "Contact"
                  )
                }
                className="text-white font-sans font-semibold hover:underline"
              >
                Contact
              </button>
              <button
                onClick={() =>
                  openModal(
                    <ModelComponent
                      title={modalData.privacyPolicy.title}
                      summary={modalData.privacyPolicy.summary}
                    />,
                    "Privacy Policy"
                  )
                }
                className="text-white font-sans font-semibold hover:underline"
              >
                Privacy Policy
              </button>
              <button
                onClick={() =>
                  openModal(
                    <ModelComponent
                      title={modalData.termsOfService.title}
                      summary={modalData.termsOfService.summary}
                    />,
                    "Terms of Service"
                  )
                }
                className="text-white font-sans font-semibold hover:underline"
              >
                Terms of Service
              </button>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            <p>&copy; {currentYear} Patient System. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <Modal isOpen={isOpen} onClose={closeModal} title={modalTitle}>
        {modalContent}
      </Modal>
    </>
  );
}
