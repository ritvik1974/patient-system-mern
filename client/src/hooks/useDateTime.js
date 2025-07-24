import { useState } from "react";

const useDateTime = () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const getDateTime = (dateString) => {
    const dateObj = new Date(dateString);
    // Extract the date (yyyy-mm-dd format)
    const date = dateObj.toISOString().split("T")[0]; // "2024-10-16"
    // Extract the time (hh:mm:ss format)
    const time = dateObj.toTimeString().split(" ")[0]; // "01:00:00"
    setDate(date);
    setTime(time);
  };

  return { date, time, getDateTime };
};

export default useDateTime;
