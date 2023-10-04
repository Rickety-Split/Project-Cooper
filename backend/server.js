const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Import the bcrypt library
const bodyParser = require('body-parser');

//Imports for token authentication
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library

// Secret key for signing JWTs (replace this with a secure key in a real-world scenario)
const JWT_SECRET_KEY = 'your-secret-key';


const PORT = process.env.PORT || 8081;

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

//Define a route to create a new user
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

// Define a route to delete a user by ID
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;

  // Define the SQL query to delete the user from the Users table
  const deleteUserQuery = 'DELETE FROM Users WHERE ID = ?';

  db.query(deleteUserQuery, [userId], (err, results) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Unable to delete user' });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json({ message: 'User deleted successfully' });
      }
    }
  });
});


// Login

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Simulating user data and audit table
const users = [
  { username: 'testuser', password: 'testpassword' },
  // Add more user data as needed
];

const auditTable = [];

// Function to sanitize input
function sanitize(input) {
  // Implement your sanitation logic here
  return input.trim(); // Example: Removing leading and trailing whitespaces
}

// Function to check API gateway status
function checkApiGateway() {
  // Simulated API gateway status
  return true;
}

// Function to authenticate user
async function authenticateUser(username, password) {
  const query = 'SELECT * FROM Users WHERE Username = ?';
  const [dbUser] = await new Promise((resolve, reject) => {
    db.query(query, [username], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

  if (dbUser && dbUser.length > 0) {
    const hashedPassword = dbUser[0].Password;
    return await bcrypt.compare(password, hashedPassword);
  }

  return false;
}


// Login route with token authentication
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Sanitize input
  const sanitizedUsername = sanitize(username);
  const sanitizedPassword = sanitize(password);

  if (sanitizedUsername && sanitizedPassword) {
    // Check API gateway status
    if (checkApiGateway()) {
      // Authenticate user
      if (authenticateUser(sanitizedUsername, sanitizedPassword)) {
        // Create user session token (JWT)
        const userSessionToken = jwt.sign({ username: sanitizedUsername }, JWT_SECRET_KEY, {
          expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
        });

        // Save to audit table
        auditTable.push({ username: sanitizedUsername, action: 'login' });

        // Respond with the token
        res.json({ token: userSessionToken });
      } else {
        res.status(401).json({ error: 'Invalid username/password.' });
      }
    } else {
      res.status(500).json({ error: 'Server not active.' });
    }
  } else {
    res.status(400).json({ error: 'Invalid input. Username/password cannot be blank.' });
  }
});

// ... (existing code)

// Middleware to authenticate requests using the token
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ error: 'Unauthorized. Token not provided.' });

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Unauthorized. Invalid token.' });

    req.user = user;
    next();
  });
}

// Example of using the authenticateToken middleware in a protected route
app.get('/protected-resource', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected resource.' });
});

  // Start the server
  app.listen(8081, () => {
    console.log('Server is listening on port 8081');
  });
  