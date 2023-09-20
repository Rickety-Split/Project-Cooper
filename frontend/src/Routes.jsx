// src/Routes.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes as Routes} from 'react-router-dom';
import UserList from '../../frontend/src/UserList';
import CreateUserForm from '../../frontend/src/CreateUserForm';
import UpdateUserForm from '../../frontend/src/UpdateUserForm';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Define routes for different views */}
                <Route exact path="/" component={UserList} />
                <Route path="/create" component={CreateUserForm} />
                <Route path="/update/:id" component={UpdateUserForm} />
                {/* Add more routes for other components as needed */}
            </Routes>
        </Router>
    );
}

export default AppRoutes;
