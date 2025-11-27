// backend_farmasi/src/setupDatabase.js
// src/setupDatabase.js
const { getDb } = require('./config/db');

const queries = [
  // Tabel Doctor_Appointments
  `CREATE TABLE IF NOT EXISTS posters (
    poster_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    image_url LONGTEXT,
    poster_name VARCHAR(255),
    pembuat VARCHAR(255),
    queue_type VARCHAR(50),
    votes BIGINT UNSIGNED DEFAULT 0,
    description LONGTEXT
);`,

  // Tabel Pharmacy_Task
  `CREATE TABLE IF NOT EXISTS responses (
    response_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    choice integer,
    phone_number VARCHAR(255),
    name VARCHAR(255),
    role VARCHAR(255),
    success BOOLEAN DEFAULT 0,
    authorized BOOLEAN DEFAULT 0,
    otp varchar(255),
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiry_date TIMESTAMP
  );`,

];

async function setupDatabase() {
  const pool = await getDb();
  const conn = await pool.getConnection(); // Get explicit connection

  try {
    for (const [i, query] of queries.entries()) {
      await conn.query(query); // Use connection directly
      console.log(`Query ${i + 1} executed`);
    }
  } catch (error) {
    console.error('Setup error:', error);
    throw error;
  } finally {
    conn.release(); // Release instead of ending
    console.log('All connections released');
  }
}

module.exports = { setupDatabase };
