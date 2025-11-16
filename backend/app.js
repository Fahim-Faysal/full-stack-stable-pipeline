const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;

const dbConfig = {
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'password',
  database: process.env.DB_NAME || 'testdb'
};

// Simple connection attempt (for demonstration)
// In prod prefer pooled connections with retries
function connectWithRetry() {
  console.log("⏳ Trying MySQL connection...");

  const db = mysql.createConnection(dbConfig);

  db.connect(err => {
    if (err) {
      console.error("❌ MySQL connection failed, retrying in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log("✅ Connected to MySQL");
    }
  });

  return db;
}

const db = connectWithRetry();

app.get('/api/health', (req, res) => {
  // Basic DB check
  db.query('SELECT 1 + 1 AS result', (err) => {
    if (err) return res.status(500).send('db-unreachable');
    res.json({ status: 'ok' });
  });
});

app.get('/', (req, res) => {
  res.send('Hello from Node backend 🚀');
});

// Export app for tests
module.exports = app;

if (require.main === module) {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}
