const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.PORT || 3306,
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
