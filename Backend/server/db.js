const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 20000
});

// Test koneksi saat awal
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Koneksi ke MySQL gagal:", err);
  } else {
    console.log("✅ Koneksi ke MySQL berhasil");
    connection.release();
  }
});

module.exports = pool;
