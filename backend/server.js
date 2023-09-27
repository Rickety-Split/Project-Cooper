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

// Define a route to update a user by ID
app.put('/api/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { username, email, fullName, password } = req.body;

  try {
    // Check if the user exists
    const userCheckQuery = 'SELECT * FROM Users WHERE ID = ?';
    db.query(userCheckQuery, [userId], async (userCheckErr, userCheckResults) => {
      if (userCheckErr) {
        console.error('Error checking user:', userCheckErr);
        res.status(500).json({ error: 'Unable to update user' });
      } else {
        if (userCheckResults.length === 0) {
          res.status(404).json({ error: 'User not found' });
        } else {
          // Update user data
          let updateUserQuery = 'UPDATE Users SET Username = ?, Email = ?, FullName = ?';
          const updateUserValues = [username, email, fullName];

          // If a new password is provided, hash it and update the password
          if (password) {
            try {
              const hashedPassword = await bcrypt.hash(password, 10);
              updateUserQuery += ', Password = ?';
              updateUserValues.push(hashedPassword);
            } catch (hashErr) {
              console.error('Error hashing password:', hashErr);
              res.status(500).json({ error: 'Unable to update user' });
              return;
            }
          }

          updateUserValues.push(userId);

          db.query(updateUserQuery + ' WHERE ID = ?', updateUserValues, (updateErr, updateResults) => {
            if (updateErr) {
              console.error('Error updating user:', updateErr);
              res.status(500).json({ error: 'Unable to update user' });
            } else {
              res.json({ message: 'User updated successfully' });
            }
          });
        }
      }
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Unable to update user' });
  }
});



  // Start the server
  app.listen(8081, () => {
    console.log('Server is listening on port 8081');
  });
  