import React, { useEffect, useState } from 'react';
import api from './services/api'; // Correctly imports the Axios instance

const CounselorList = () => {
    const [counselors, setCounselors] = useState([]);

    useEffect(() => {
        api.get('/counselors')
            .then(response => {
                setCounselors(response.data);
            })
            .catch(error => {
                console.error('Error fetching counselors:', error);
            });
    }, []);

    return (
        <div>
            <h2>Counselor List</h2>
            <ul>
                {counselors.map(counselor => (
                    <li key={counselor.counselorId}>
                        {counselor.firstName} {counselor.lastName} - {counselor.expertise}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CounselorList;
