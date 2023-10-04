import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeleteUser() {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the list of users for the dropdown
    axios.get('/api/users')
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user list:', error);
      });
  }, []);

  const handleDelete = async () => {
    try {
      // Send a DELETE request to delete the user by ID
      await axios.delete(`/api/users/${selectedUser}`);
      setMessage('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage('Error deleting user');
    }
  };

  return (
    <div>
      <h2>Delete User</h2>
      <div>
        <label>Select User:</label>
        <select onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="" disabled>Select User</option>
          {userList.map((user) => (
            <option key={user.ID} value={user.ID}>{user.Username}</option>
          ))}
        </select>
      </div>
      <button onClick={handleDelete}>Delete User</button>
      <p>{message}</p>
    </div>
  );
}

export default DeleteUser;
