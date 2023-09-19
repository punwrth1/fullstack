const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT ;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE ,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to the database');
  }
});

let currentCount = 0;

// Initialize the click count from the database
db.query('SELECT count FROM click_counts WHERE id = 2', (err, results) => {
  if (!err && results.length > 0) {
    currentCount = results[0].count;
  }
});

app.get('/api/backend', (req, res) => {
  // Retrieve the click count from the database
  db.query('SELECT count FROM click_counts WHERE id = 2', (err, results, fields) => {
    if (err) {
      console.error('Error fetching click count:', err);
      res.status(500).json({ error: 'Error fetching click count' });
    } else {
      // Send the click count to the front-end
      res.json({ count: results[0].count }); // Assuming the count is at index 0
    }
  });
});

// Update the click count in the database
app.put('/api/backend', (req, res) => {
  const { count } = req.body;

  db.query('UPDATE click_counts SET count = ? WHERE id = 2', [count], (err) => {
    if (err) {
      console.error('Error updating click count:', err);
      res.status(500).json({ error: 'Error updating click count' });
    } else {
      // Send a success response to the front-end
      res.json({ success: true });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
