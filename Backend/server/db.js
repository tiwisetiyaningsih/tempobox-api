const mysql = require('mysql2/promise');

function stripQuotes(v) {
  return v?.replace(/^["']|["']$/g, '');
}

const db = mysql.createPool({
  host: stripQuotes(process.env.DB_HOST),
  user: stripQuotes(process.env.DB_USER),
  password: stripQuotes(process.env.DB_PASS),
  database: stripQuotes(process.env.DB_NAME),
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test koneksi async
async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log('Koneksi ke MySQL berhasil!');
    connection.release();
  } catch (err) {
    console.error('⚠️ Koneksi ke MySQL gagal, tapi server tetap jalan:', err.message);
  }
}


testConnection();

module.exports = db;
