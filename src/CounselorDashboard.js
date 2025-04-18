import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./styles/CounselorDashboard.css";

const CounselorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    // Fetching Appointments
    fetch("http://localhost:8080/counselor/appointments")
      .then((res) => res.json())
      .then((data) => {
        console.log("📌 Raw Appointments Data:", data);
        
        // Check if response contains the expected "content" field
        if (data && data.content && Array.isArray(data.content)) {
          console.log("✅ Extracted Appointments Content:", data.content);
          setAppointments(data.content);
        } else {
          console.error("❌ ERROR: Appointments 'content' is not an array!", JSON.stringify(data, null, 2));
          setAppointments([]); // Prevent errors if API response is malformed
        }
        
        setLoadingAppointments(false);
      })
      .catch((error) => {
        console.error("🚨 Error fetching appointments:", error);
        setLoadingAppointments(false);
      });

    // Fetching Stats
    fetch("http://localhost:8080/counselor/stats")
      .then((res) => res.json())
      .then((data) => {
        console.log("📊 Stats Data:", data);
        if (data) {
          setStats(data);
        } else {
          console.error("❌ ERROR: Stats data is missing!", data);
          setStats(null);
        }
        setLoadingStats(false);
      })
      .catch((error) => {
        console.error("🚨 Error fetching stats:", error);
        setLoadingStats(false);
      });
  }, []);

  // Show Loading State
  if (loadingAppointments || loadingStats) return <p>Loading...</p>;

  // Show Error Messages
  if (appointments.length === 0) return <p>No appointments available.</p>;
  if (!stats) return <p>No stats available.</p>;

  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      {/* Appointments Table */}
      <Card className="col-span-2">
        <CardContent>
          <Typography variant="h6" className="text-xl font-semibold mb-4">Upcoming Appointments</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Date & Time</TableCell>
                <TableCell>Counselor</TableCell>
                <TableCell>Topic</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Feedback</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appt) => (
                <TableRow key={appt.id}>
                  <TableCell>{appt.studentId || "Unknown"}</TableCell>
                  <TableCell>
                    {appt.appointmentDate && appt.appointmentTime
                      ? new Date(`${appt.appointmentDate}T${appt.appointmentTime}`).toLocaleString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>{`${appt.counselor.firstName} ${appt.counselor.lastName}` || "Unknown Counselor"}</TableCell>
                  <TableCell>{appt.topic || "No topic"}</TableCell>
                  <TableCell>
                    <span className={`status-${appt.status.toLowerCase()}`}>{appt.status || "Pending"}</span>
                  </TableCell>
                  <TableCell>{appt.feedback || "No feedback"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Appointment Overview Chart */}
      <Card>
        <CardContent>
          <Typography variant="h6" className="text-xl font-semibold mb-2">Appointment Overview</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats?.appointmentData || []}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Feedback Overview */}
      <Card>
        <CardContent>
          <Typography variant="h6" className="text-xl font-semibold mb-2">Feedback Overview</Typography>
          <p className="text-lg">Average Rating: {stats?.averageRating ? stats.averageRating.toFixed(2) : "N/A"} ⭐️</p>
          <p>Total Feedbacks: {stats?.totalFeedbacks ?? "N/A"}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CounselorDashboard;
