// src/Routes.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Route
import UserList from '../../frontend/src/UserList';
import CreateUserForm from '../../frontend/src/CreateUserForm';
import UpdateUserForm from '../../frontend/src/UpdateUserForm';

function AppRoutes() {
    return (
        <Router>
            <Routes> {/* Use Routes for the parent */}
                {/* Define routes for different views */}
                <Route path="/" element={<UserList />} /> {/* Use Route for child routes */}
                <Route path="create" element={<CreateUserForm />} />
                <Route path="update/:id" element={<UpdateUserForm />} />
                {/* Add more routes for other components as needed */}
            </Routes>
        </Router>
    );
}

export default AppRoutes;
