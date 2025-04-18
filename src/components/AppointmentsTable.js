import React, { useEffect, useState } from "react";
import { getAppointments } from "../services/appointmentService";
import "./AppointmentsTable.css"; // Optional CSS module for table styling

const AppointmentsTable = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const data = await getAppointments();
            setAppointments(data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    return (
        <div className="table-container">
            <h2>Appointments</h2>
            <table className="appointments-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Student ID</th>
                        <th>Counselor ID</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Feedback</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.appointmentId}>
                            <td>{appointment.appointmentId}</td>
                            <td>{appointment.studentId}</td>
                            <td>{appointment.counselorId}</td>
                            <td>{appointment.appointmentDate.split("T")[0]}</td>
                            <td>{appointment.appointmentTime}</td>
                            <td>{appointment.status}</td>
                            <td>{appointment.feedback}</td>
                            <td>
                                {/* Add Delete Button Here */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AppointmentsTable;
