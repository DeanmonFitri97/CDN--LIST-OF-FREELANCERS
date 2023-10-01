// Import required modules
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path'); // Add this line to handle file paths

// Create Express app
const app = express();
const port = 3000;

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Grimrko+1997',
  database: 'fitrijamal',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Define API endpoints

// Get all users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

// Create a new user
app.post('/users', (req, res) => {
  const { username, email, phone, skillsets, hobby } = req.body;

  // Insert the new user into the database
  db.query(
    'INSERT INTO users (username, email, phone, skillsets, hobby) VALUES (?, ?, ?, ?, ?)',
    [username, email, phone, skillsets, hobby],
    (err, result) => {
      if (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json({ message: 'User created successfully', id: result.insertId });
    }
  );
});

// Update an existing user
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { username, email, phone, skillsets, hobby } = req.body;

  // Update the user in the database
  db.query(
    'UPDATE users SET username=?, email=?, phone=?, skillsets=?, hobby=? WHERE id=?',
    [username, email, phone, skillsets, hobby, userId],
    (err) => {
      if (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json({ message: 'User updated successfully' });
    }
  );
});

// Delete a user by ID
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  // Delete the user from the database
  db.query('DELETE FROM users WHERE id=?', [userId], (err) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ message: 'User deleted successfully' });
  });
});

// Serve the HTML file for the root URL ("/")
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Define a route handler for static assets (e.g., CSS, JS files)
app.use(express.static(__dirname));

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
