const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Import the bcrypt library

const app = express();
app.use(cors());
app.use(express.json()); // Enable JSON body parsing

// Create a MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123', // Replace with your MySQL password
  database: 'dbCooper', // Replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Define a route to fetch all users
app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM Users';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Unable to fetch users' });
    } else {
      res.json(results);
    }
  });
});

// Define a route to fetch a single user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM Users WHERE ID = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Unable to fetch user' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json(results[0]);
      }
    }
  });
});

// Other CRUD routes for creating, updating, and deleting users can be added here


// Added route for creating users

// Define a route to create a new user
app.post('/api/users', async (req, res) => {
    const { username, password, email, fullName } = req.body;
  
    try {
      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds: 10
  
      // Define the SQL query to insert data into the Users table
      const query = 'INSERT INTO Users (Username, Password, Email, FullName, CreatedAt, UpdatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())';
      const values = [username, hashedPassword, email, fullName];
  
      db.query(query, values, (err, results) => {
        if (err) {
          console.error('Error creating user:', err);
          res.status(500).json({ error: 'Unable to create user' });
        } else {
          res.json({ message: 'User created successfully' });
        }
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Unable to create user' });
    }
  });
  
  // Other CRUD routes for fetching, updating, and deleting users can be added here
  
  // Start the server
  app.listen(8081, () => {
    console.log('Server is listening on port 8081');
  });
  