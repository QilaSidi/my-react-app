import React, { useState } from 'react';
import api from './services/api'; // Correctly imports the Axios instance

const CreateCounselor = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        expertise: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/counselors', formData)
            .then(response => {
                alert('Counselor created successfully!');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    expertise: ''
                });
            })
            .catch(error => {
                console.error('Error creating counselor:', error);
                alert('Failed to create counselor. Please try again.');
            });
    };

    return (
        <div>
            <h2>Create Counselor</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="expertise"
                    placeholder="Expertise"
                    value={formData.expertise}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateCounselor;
