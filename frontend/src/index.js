// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRoutes from './Routes'; // Import the Routes component

ReactDOM.render(
    <React.StrictMode>
        <AppRoutes /> {/* Render the Routes component */}
    </React.StrictMode>,
    document.getElementById('root')
);
