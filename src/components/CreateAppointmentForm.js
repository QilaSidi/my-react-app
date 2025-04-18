import React, { useState } from "react";
import { createAppointment } from "../services/appointmentService";
import "./AppointmentForm.css";

const AppointmentForm = () => {
    const [formData, setFormData] = useState({
        studentId: "",
        counselorId: "",
        appointmentDate: "",
        appointmentTime: "",
        status: "PENDING",
        feedback: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createAppointment(formData);
            alert("Appointment created successfully!");
            setFormData({
                studentId: "",
                counselorId: "",
                appointmentDate: "",
                appointmentTime: "",
                status: "PENDING",
                feedback: "",
            });
        } catch (error) {
            alert("Failed to create the appointment. Please try again later.");
            console.error("Error creating appointment:", error);
        }
    };

    return (
        <form className="appointment-form" onSubmit={handleSubmit}>
            <h2>Create Appointment</h2>
            <input
                type="text"
                name="studentId"
                placeholder="Student ID (e.g., AM123456)"
                value={formData.studentId}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="counselorId"
                placeholder="Counselor ID"
                value={formData.counselorId}
                onChange={handleChange}
                required
            />
            <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                required
            />
            <input
                type="time"
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleChange}
                required
            />
            <select name="status" value={formData.status} onChange={handleChange}>
                <option value="PENDING">PENDING</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELED">CANCELED</option>
            </select>
            <textarea
                name="feedback"
                placeholder="Feedback (optional)"
                value={formData.feedback}
                onChange={handleChange}
            />
            <button type="submit">Create Appointment</button>
        </form>
    );
};

export default AppointmentForm;