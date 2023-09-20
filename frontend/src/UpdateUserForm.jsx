// src/components/UpdateUserForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateUserForm() {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        email: '',
        fullName: '',
    });

    const [userId, setUserId] = useState(); // Set the user ID for updating

    useEffect(() => {
        // Fetch user details for updating
        if (userId) {
            axios.get(`/api/users/${userId}`)
                .then((response) => {
                    setUserData(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching user details:', error);
                });
        }
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a PUT request to update the user
            const response = await axios.put(`/api/users/${userId}`, userData);
            console.log('User updated:', response.data);
            // Optionally, reset the form or redirect to a different page
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div>
            <h2>Update User</h2>
            <form onSubmit={handleSubmit}>
                {/* Input fields for updating user data */}
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />
                </div>
                <div>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={userData.fullName}
                        onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                    />
                </div>
                {/* You can include the password update here if needed */}
                { <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    />
                </div> }
                <button type="submit">Update User</button>
            </form>
        </div>
    );
                }

export default UpdateUserForm;