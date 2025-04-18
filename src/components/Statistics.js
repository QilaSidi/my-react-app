import React, { useEffect, useState } from 'react';
import api from './services/api'; // Correctly imports the Axios instance

const Statistics = () => {
    const [counselorStats, setCounselorStats] = useState('');
    const [appointmentStats, setAppointmentStats] = useState('');

    useEffect(() => {
        // Fetch counselor statistics
        api.get('/counselors/stats')
            .then(response => setCounselorStats(response.data))
            .catch(error => console.error('Error fetching counselor stats:', error));

        // Fetch appointment statistics
        api.get('/counselors/appointments')
            .then(response => setAppointmentStats(response.data))
            .catch(error => console.error('Error fetching appointment stats:', error));
    }, []);

    return (
        <div>
            <h2>Statistics</h2>
            <p>{counselorStats}</p>
            <p>{appointmentStats}</p>
        </div>
    );
};

export default Statistics;
