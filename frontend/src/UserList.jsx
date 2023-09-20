// src/components/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from the API
        axios.get('/api/users')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, []);

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.ID}>
                        Username: {user.Username}, Email: {user.Email}, Full Name: {user.FullName}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
