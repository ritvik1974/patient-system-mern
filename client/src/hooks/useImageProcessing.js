import { useState } from "react";

const useImageProcessor = () => {
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null);

  const processImage = (file) => {
    if (!file) {
      setError("No file selected");
      return;
    }

    // Validate image format (only JPEG/PNG for example)
    const validFormats = ["image/jpeg", "image/png"];
    if (!validFormats.includes(file.type)) {
      setError("Invalid file format. Please upload a JPEG or PNG image.");
      setImageData(null);
      return;
    }

    // Convert image to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData(reader.result); // Set the base64 string to state
    };
    reader.readAsDataURL(file);
  };

  return { imageData, error, processImage };
};

export default useImageProcessor;
