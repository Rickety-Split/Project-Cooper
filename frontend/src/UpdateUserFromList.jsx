import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateUserFromList({ userId }) {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        email: '',
        fullName: '',
    });

    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        if (userId) {
            axios.get(`/api/users/${userId}`)
                .then((response) => {
                    if (response.data) {
                        setUserData(response.data);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user details:', error);
                });
        }
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            console.error('User ID is undefined.');
            return;
        }
        try {
            const response = await axios.put(`/api/users/${userId}`, userData);
            console.log('User updated:', response.data);
            setUpdateSuccess(true); // Set the success state to true
        } catch (error) {
            console.error('Error updating user:', error);
            console.log('Error response:', error.response); // Log the response for more details
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // Reset the success state when input changes
        setUpdateSuccess(false);
    };

    return (
        <div>
            <h2>Update User</h2>
            {updateSuccess && <p>User updated successfully!</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    {/* Input fields for updating user data */}
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={userData.fullName}
                        onChange={handleInputChange}
                    />
                </div>
                {/* You can include the password update here if needed */}
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Update User</button>
            </form>
        </div>
    );
}

export default UpdateUserFromList;