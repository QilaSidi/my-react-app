import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CounselorProfile.css"; // Link to the CSS file

const CounselorProfile = () => {
  const { id } = useParams(); // Get counselor ID from the URL params
  const navigate = useNavigate();
  const [counselor, setCounselor] = useState(null); // State to hold counselor data
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounselor = async () => {
      try {
        const response = await fetch(`http://localhost:8080/counselors/${id}`);
        const data = await response.json();
        setCounselor(data);
      } catch (err) {
        console.error("Failed to fetch counselor details:", err);
        setError("Failed to load counselor details. Please try again.");
      }
    };

    fetchCounselor();
  }, [id]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!counselor) {
    return <p>Loading counselor details...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
      <img src="https://via.placeholder.com/100" alt="Counselor's profile" />

        <div>
          <h2>{counselor.firstName} {counselor.lastName}</h2>
          <p>{counselor.expertise}</p>
        </div>
      </div>
      <div className="profile-details">
        <p><strong>Email:</strong> {counselor.email}</p>
        <p><strong>Phone:</strong> {counselor.phoneNumber}</p>
        <p><strong>Expertise:</strong> {counselor.expertise}</p>
      </div>
      <div className="profile-actions">
        <button className="message-btn" onClick={() => alert("Message Sent!")}>
          Send Message
        </button>
        <button className="back-btn" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default CounselorProfile;
