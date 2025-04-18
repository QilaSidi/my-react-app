import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/AppointmentBooking.css";

const AppointmentBooking = () => {
  const [counselors, setCounselors] = useState([]);
  const [formData, setFormData] = useState({
    studentId: "",
    counselorId: "",
    appointmentDate: "",
    appointmentTime: "",
    feedback: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/appointments/counselors");
        setCounselors(response.data);
      } catch (error) {
        console.error("Error fetching counselors:", error);
      }
    };
    fetchCounselors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectCounselor = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      counselorId: e.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const studentEmail = localStorage.getItem("email"); // Fetch stored email
    if (!studentEmail) {
      setMessage("Error: Student email not found. Please log in again.");
      setMessageType("error");
      return;
    }

    const studentId = studentEmail.split("@")[0]; // Extract student ID
    const updatedFormData = { ...formData, studentId }; // Add student ID to payload

    try {
      await axios.post("http://localhost:8080/appointments", updatedFormData); // Send POST request
      setMessage("Appointment booked successfully!");
      setMessageType("success");
    } catch (error) {
      setMessage("Failed to book the appointment. Please try again.");
      setMessageType("error");
      console.error("Error booking appointment:", error.response?.data || error.message);
    }
  };

  return (
    <div className="appointment-booking-container">
      <h2>Book an Appointment</h2>
      <form className="appointment-form" onSubmit={handleSubmit}>
        <label>
          Select a Counselor:
          <select
            name="counselorId"
            value={formData.counselorId}
            onChange={handleSelectCounselor}
            required
            className="input-field"
          >
            <option value="">-- Select a Counselor --</option>
            {counselors.map((counselor) => (
              <option key={counselor.counselorId} value={counselor.counselorId}>
                {counselor.firstName} {counselor.lastName}
              </option>
            ))}
          </select>
        </label>
        <label>
          Appointment Date:
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
            className="input-field"
          />
        </label>
        <label>
          Appointment Time:
          <input
            type="time"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            required
            className="input-field"
          />
        </label>
        <label>
          Feedback (Optional):
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            className="textarea-field"
          />
        </label>
        <button type="submit" className="submit-btn">
          Book Appointment
        </button>
      </form>
      {message && (
        <div className={`message ${messageType === "success" ? "success-message" : "error-message"}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default AppointmentBooking;