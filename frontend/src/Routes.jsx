// src/Routes.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Route
import UserList from '../../frontend/src/UserList';
import CreateUserForm from '../../frontend/src/CreateUserForm';
import UpdateUserFromList from './UpdateUserFromList';
import DeleteUser from '../../frontend/src/DeleteUser'; 
import Login from './login'; 
import Dashboard from './dashboard';


// function PrivateRoute({ element, ...rest }) {
//     return isAuthenticated() ? (
//       element
//     ) : (
//       <Navigate to="/login" replace state={{ from: rest.location.pathname }} />
//     );
//   }

function AppRoutes() {
    return (
        <Router>
            <Routes> {/* Use Routes for the parent */}
                {/* Define routes for different views */}
                <Route path="UserList" element={<UserList />} /> {/* Use Route for child routes */}
                <Route path="create" element={<CreateUserForm />} />
                <Route path="update/:id" element={<UpdateUserFromList/>} />
                <Route path="delete" element={<DeleteUser />} />
                <Route path="login" element={<Login />} />
                <Route path="dashboard" element={<Dashboard />} />
                {/* Use PrivateRoute for routes that require authentication */}
                {/* <Route path="dashboard" element={<PrivateRoute element={<Dashboard />} />} /> */}
            </Routes>
        </Router>
    );
}

export default AppRoutes;
