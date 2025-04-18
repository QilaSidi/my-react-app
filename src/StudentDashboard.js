import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Routes, Route } from "react-router-dom"; // Import necessary hooks
import "./styles/StudentDashboard.css"; // Add this CSS file for styles
import AppointmentBooking from "./AppointmentBooking"; // Corrected import path

const StudentDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null); // Holds backend data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const navigate = useNavigate(); // Get the navigate function

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = sessionStorage.getItem("token");

                if (!token) {
                    throw new Error("No token found. Please log in.");
                }

                const response = await axios.get("http://localhost:8082/student/dashboard", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setDashboardData(response.data); // Store fetched data
            } catch (err) {
                setError(err.response?.data?.error || err.message || "Error fetching dashboard data.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const handleBookAppointmentClick = () => {
        navigate("book"); // Navigate to the appointment form (nested route)
    };

    // Placeholder for handling "Chat Now," "View Resources," and "Logout"
    const handleChatNowClick = () => {
        // Add chat functionality here (e.g., open a chat window)
        console.log("Chat Now clicked");
    };

    const handleViewResourcesClick = () => {
        // Add navigation or functionality to view resources
        console.log("View Resources clicked");
    };

    const handleLogoutClick = () => {
        // Add logout functionality (clear token, navigate to login)
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("email");
        navigate("/"); // Assuming "/" is your login/home route
    };

    if (loading) {
        return (
            <div className="dashboard-container">
                <p>Loading data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-container">
                <p className="error">Error: {error}</p>
            </div>
        );
    }

    if (!dashboardData) {
        return (
            <div className="dashboard-container">
                <p>No data available for your dashboard.</p>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome, {dashboardData.fullName}! 👋</h1>
                <p>Email: {dashboardData.email}</p>
            </header>

            <div className="dashboard-content">
                {/* Section: Upcoming Appointments */}
                <section className="dashboard-section">
                    <h2>Upcoming Appointments</h2>
                    {dashboardData.upcomingAppointments?.length > 0 ? (
                        <ul>
                            {dashboardData.upcomingAppointments.map((appointment, index) => (
                                <li key={index}>{appointment.details}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No upcoming appointments.</p>
                    )}
                    <button className="section-button" onClick={handleBookAppointmentClick}>
                        Book an Appointment
                    </button>
                </section>

                {/* Section: Counseling History */}
                <section className="dashboard-section">
                    <h2>Counseling History</h2>
                    {dashboardData.counselingHistory?.length > 0 ? (
                        <ul>
                            {dashboardData.counselingHistory.map((session, index) => (
                                <li key={index}>{session.details}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No past counseling sessions found.</p>
                    )}
                </section>

                {/* Section: Ask Sophie */}
                <section className="dashboard-section">
                    <h2>Ask Sophie</h2>
                    <p>Need guidance? Chat with Sophie!</p>
                    <button className="section-button" onClick={handleChatNowClick}>Chat Now</button>
                </section>

                {/* Section: Academic Resources */}
                <section className="dashboard-section">
                    <h2>Academic Resources</h2>
                    <p>Explore guides and materials to support your studies.</p>
                    <button className="section-button" onClick={handleViewResourcesClick}>View Resources</button>
                </section>
            </div>

            <footer className="dashboard-footer">
                <button className="footer-button" onClick={handleLogoutClick}>Logout</button>
            </footer>

            {/* Nested route for Appointment Form */}
            <Routes>
                <Route path="book" element={<AppointmentBooking />} /> {/* Corrected component name */}
            </Routes>
        </div>
    );
};

export default StudentDashboard;