import React from 'react';
import CounselorList from './CounselorList'; // Correctly imports the file
import CreateCounselor from './CreateCounselor'; // Create Counselor form

const CounselorPage = () => {
    return (
        <div>
            <h1>Counselor Management</h1>
            <CreateCounselor /> {/* Component to create a new counselor */}
            <CounselorList /> {/* Component to display the list of counselors */}
        </div>
    );
};

export default CounselorPage;
