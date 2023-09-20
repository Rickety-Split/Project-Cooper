// src/components/CreateUserForm.js
import React, { useState } from 'react';
import axios from 'axios';

function CreateUserForm() {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        email: '',
        fullName: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to create a new user
            const response = await axios.post('/api/users', userData);
            console.log('User created:', response.data);
            // Optionally, reset the form or redirect to a different page
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div>
            <h2>Create User</h2>
            <form onSubmit={handleSubmit}>
                {/* Input fields for user data */}
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
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
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
                <button type="submit">Create User</button>
            </form>
        </div>
    );
}

export default CreateUserForm;
