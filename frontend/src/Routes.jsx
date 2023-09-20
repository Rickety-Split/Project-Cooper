// src/Routes.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserList from './components/UserList';
import CreateUserForm from './components/CreateUserForm';
import UpdateUserForm from './components/UpdateUserForm';

function Routes() {
    return (
        <Router>
            <Switch>
                {/* Define routes for different views */}
                <Route exact path="/" component={UserList} />
                <Route path="/create" component={CreateUserForm} />
                <Route path="/update/:id" component={UpdateUserForm} />
                {/* Add more routes for other components as needed */}
            </Switch>
        </Router>
    );
}

export default Routes;
