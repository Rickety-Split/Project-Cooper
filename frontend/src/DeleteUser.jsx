// DeleteUser.jsx
import React, { useState } from 'react';
import axios from 'axios';

function DeleteUser() {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    try {
      // Send a DELETE request to delete the user by ID
      await axios.delete(`/api/users/${userId}`);
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
        <label>User ID:</label>
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <button onClick={handleDelete}>Delete User</button>
      <p>{message}</p>
    </div>
  );
}

export default DeleteUser;
