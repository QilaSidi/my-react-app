
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // Retrieve JWT token from sessionStorage using the correct key "token"
        const token = sessionStorage.getItem('token');

        // Send a request to your backend to fetch student data
        const response = await axios.get('http://localhost:8082/student/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer prefix
          },
        });

        // Update the state with the student data
        setStudentData(response.data);
      } catch (err) {
        setError('Failed to fetch student data');
        // You might want to log the error for debugging:
        console.error("Error fetching student data:", err);
      }
    };

    fetchStudentData();
  }, []);

  // Helper function to extract student ID and modify it (no changes here)
  const formatStudentId = (email) => {
    if (email) {
      const idPart = email.split('@')[0];
      return 'AM' + idPart.slice(2);
    }
    return '';
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to the Student Dashboard!</h1>
      <p>Email: {studentData.email}</p>
      <p>Student ID: {formatStudentId(studentData.email)}</p>
      <p>Student Name: {studentData.studentName}</p>
    </div>
  );
};

export default StudentDashboard;