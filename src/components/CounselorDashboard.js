import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import "./styles/CounselorDashboard.css";

const CounselorDashboard = () => {
  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      <Card className="col-span-2">
        <CardContent>
          <Typography variant="h5" className="text-xl font-semibold">
            Welcome to the Counselor Dashboard
          </Typography>
          <Typography variant="body1" className="mt-2">
            This page will be updated with analytics and appointment details in the future.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CounselorDashboard;
