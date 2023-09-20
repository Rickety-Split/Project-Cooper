// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes'; // Import the Routes component

ReactDOM.render(
    <React.StrictMode>
        <Routes /> {/* Render the Routes component */}
    </React.StrictMode>,
    document.getElementById('root')
);
