import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateUserFromList from './UpdateUserFromList';

function UserList() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        axios.get('/api/users')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleUserSelect = (userId) => {
        setSelectedUserId(userId);
    };

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.ID}>
                        Username: {user.Username}, Email: {user.Email}, Full Name: {user.FullName}
                        <button onClick={() => handleUserSelect(user.ID)}>Select User</button>
                    </li>
                ))}
            </ul>
            {selectedUserId && <UpdateUserFromList userId={selectedUserId} />}
        </div>
    );
}

export default UserList;
