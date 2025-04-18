import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/CounselingHistory.css"; // Assuming you have a CSS file for styling

const CounselingHistory = () => {
  const [history, setHistory] = useState([]); // Holds counseling history data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchHistory = async () => {
      const email = localStorage.getItem("studentEmail"); // Retrieve email
      console.log("Student email:", email); // Debugging log
  
      // Extract the numeric part of the student ID from the email
      const numericId = email.match(/\d+/g)?.[0]; // Extract "2211012871"
      if (!numericId) {
        console.error("Invalid email format. Cannot extract student ID.");
        setError("Invalid email format. Please log in again.");
        setLoading(false);
        return;
      }
  
      // Prepend "AM" to form the full student ID
      const studentId = `AM${numericId}`;
      console.log("Transformed studentId:", studentId); // Debugging log
  
      try {
        // Make API call to fetch counseling history
        const response = await axios.get(
          `http://localhost:8080/counseling-history?studentId=${studentId}`
        );
        console.log("Fetched counseling history:", response.data);
        setHistory(response.data); // Store the fetched data
      } catch (err) {
        console.error("Failed to fetch counseling history:", err.response?.data || err.message);
        setError("Failed to load counseling history. Please try again.");
      } finally {
        setLoading(false); // End loading state
      }
    };
  
    fetchHistory();
  }, []);
  

  if (loading) return <p>Loading counseling history...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="counseling-history-container">
      <h2>Your Counseling History</h2>
      {history.length > 0 ? (
        <table className="history-table">
          <thead>
            <tr>
              <th>Session Date</th>
              <th>Counselor ID</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {history.map((session) => (
              <tr key={session.id}>
                <td>{new Date(session.sessionDate).toLocaleString()}</td>
                <td>{session.counselorId}</td>
                <td>{session.notes || "No notes provided"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-history-message">No counseling history available.</p>
      )}
    </div>
  );
};

export default CounselingHistory;
