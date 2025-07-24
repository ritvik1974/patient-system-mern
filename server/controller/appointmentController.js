import { ObjectId } from "mongodb";
import { db } from "../config/db.mjs";

export const bookAppointment = async (req, res) => {
  const { date, time, department, comments, doctor, name } = req.body;
  // console.log("called bookAppointment ", "file_is", req.file);

  try {
    const appointments = db.collection("appointments");

    const newAppointment = {
      userId: new ObjectId(req.userId),
      date,
      time,
      department,
      doctor,
      name,
      img: req.file
        ? {
            buffer: req.file.buffer, // Store the image buffer
            mimetype: req.file.mimetype, // Store the MIME type (e.g., image/jpeg)
          }
        : null, // Handle case when no image is uploaded
      comments,
      createdAt: new Date(),
    };

    const result = await appointments.insertOne(newAppointment);
    res.status(201).json({
      message: "Appointment booked successfully",
      appointmentId: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ message: "Error booking appointment", error });
  }
};

export const getAppointments = async (req, res) => {
  try {
    // console.log("called getAppointments");
    const appointments = db.collection("appointments");

    const userAppointments = await appointments
      .find({ userId: new ObjectId(req.userId) })
      .toArray();

    // Convert image buffers to base64 strings
    const formattedAppointments = userAppointments.map((appointment) => {
      let imgBase64 = null;

      if (appointment.img && appointment.img.buffer) {
        imgBase64 = `data:${
          appointment.img.mimetype
        };base64,${appointment.img.buffer.toString("base64")}`;
      }

      return {
        id: appointment._id,
        date: appointment.date,
        name: appointment.name,
        time: appointment.time,
        department: appointment.department,
        doctor: appointment.doctor,
        comments: appointment.comments,
        img: imgBase64, // Converted image string
        createdAt: appointment.createdAt,
      };
    });

    res.status(200).json(formattedAppointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
};
