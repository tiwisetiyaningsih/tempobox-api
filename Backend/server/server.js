const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors'); 
const db = require('./db'); 
const multer = require("multer");
const path = require("path");


const app = express();
const port = 3001; 

app.use(cors());
app.use(bodyParser.json());


// serve folder uploads
app.use("/uploads", express.static("uploads"));

// ========================
// MULTER SETUP (UPLOAD FOTO)
// ========================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });


// -------------------------------------------------------------------
// Endpoint Register (Ditambahkan Logging Ringan)
// -------------------------------------------------------------------
app.post('/register', async (req, res) => {
    console.log('--- ATTEMPT: REGISTER ---');
    const { name, email, phone, password } = req.body;

    try {
        const [rows] = await db.execute('SELECT email FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(409).json({ message: 'Email sudah terdaftar.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users (name, email, phone, password, role, photo_profil)
            VALUES (?, ?, ?, ?, 'user', NULL)
        `;
        await db.execute(sql, [name, email, phone, hashedPassword]);

        res.status(201).json({ message: 'Pendaftaran berhasil! Silakan masuk.' });

    } catch (error) {
        console.error("REGISTER ERROR:", error);
        res.status(500).json({ message: 'Terjadi kesalahan server saat pendaftaran.' });
    }
});


// -------------------------------------------------------------------
// Endpoint Login (Dengan Logging Ekstrem)
// -------------------------------------------------------------------
app.post('/login', async (req, res) => {
    console.log('--- ATTEMPT: LOGIN RECEIVED ---');
    const { email, password } = req.body;

    try {
        // Tambahkan role dan photo_profil
        const [rows] = await db.execute(
            'SELECT id, name, email, password, phone, role, photo_profil FROM users WHERE email = ?',
            [email]
        );
        
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Email atau kata sandi salah.' });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Email atau kata sandi salah.' });
        }

        const safeUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,               // <-- DITAMBAHKAN
            photo_profil: user.photo_profil // <-- DITAMBAHKAN
        };
        
        res.status(200).json({
            message: 'Login berhasil',
            user: safeUser,
        });

    } catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).json({ message: 'Terjadi kesalahan server saat login.' });
    }
});

// ===========================
// GET USER BY ID
// ===========================
app.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await db.execute(
            `SELECT * FROM users WHERE id = ?`,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "User tidak ditemukan." });
        }

        res.json(rows[0]);

    } catch (error) {
        console.error("GET USER ERROR:", error);
        res.status(500).json({ message: "Gagal mengambil data user." });
    }
});

// ===========================
// GET ALL USER
// ===========================
app.get('/users', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT * FROM users ORDER BY id DESC
        `);

        res.json(rows);
    } catch (error) {
        console.error("GET USERS ERROR:", error);
        res.status(500).json({ message: 'Gagal mengambil data user' });
    }
});


// =============================
// UPDATE USER + UPLOAD FOTO
// =============================
app.put('/users/:id', upload.single("photo_profil"), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, role, password } = req.body;

        // PERHATIKAN: removePhoto HARUS dicek pakai req.body TANPA strict compare
        const removePhoto = req.body.removePhoto;

        let newPhotoUrl = null;

        // Jika upload foto baru
        if (req.file) {
            newPhotoUrl = `http://localhost:${port}/uploads/${req.file.filename}`;
        }

        // Ambil data user lama
        const [oldUserRows] = await db.execute(
            'SELECT password, photo_profil FROM users WHERE id = ?',
            [id]
        );
        if (oldUserRows.length === 0) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        const oldUser = oldUserRows[0];

        // Password
        let finalPassword = oldUser.password;
        if (password && password.trim() !== "") {
            finalPassword = await bcrypt.hash(password, 10);
        }

        // Foto profil
        let finalPhoto = oldUser.photo_profil;

        // ---- PRIORITY: hapus foto ----
        if (removePhoto == "true") {       // pakai == biar fleksibel
            finalPhoto = null;
        }

        // ---- Upload foto baru override hapus ----
        if (newPhotoUrl) {
            finalPhoto = newPhotoUrl;
        }

        // Update DB
        // Helper: ubah undefined -> null
const toNull = (v) => (v === undefined ? null : v);

await db.execute(
    `UPDATE users 
     SET name=?, email=?, phone=?, role=?, password=?, photo_profil=?
     WHERE id=?`,
    [
        toNull(name),
        toNull(email),
        toNull(phone),
        toNull(role),
        toNull(finalPassword),
        toNull(finalPhoto),
        toNull(id),
    ]
);


        res.json({ message: "Profile berhasil diupdate." });

    } catch (error) {
        console.error("UPDATE PROFILE ERROR:", error);
        res.status(500).json({ message: "Terjadi kesalahan saat update profile." });
    }
});

// ==========================================
// TAMBAH USER
// ==========================================
app.post("/users", upload.single("photo_profil"), async (req, res) => {
    try {
        const { name, email, phone, role, password } = req.body;

        if (!name || !email || !phone || !role) {
            return res.status(400).json({ message: "Semua field wajib diisi." });
        }

        // Cek email duplikat
        const [exist] = await db.execute(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (exist.length > 0) {
            return res.status(400).json({ message: "Email sudah digunakan!" });
        }

        const hashedPass = await bcrypt.hash(password || "default123", 10);

        // Nama file foto
        const photoName = req.file ? req.file.filename : null;

        // Insert data user
        const [result] = await db.execute(
            `INSERT INTO users (name, email, phone, role, password, photo_profil)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [name, email, phone, role, hashedPass, photoName]
        );

        const createdId = result.insertId;

        // Ambil kembali user yang baru dibuat
        const [newUser] = await db.execute(
            "SELECT id, name, email, phone, role, photo_profil FROM users WHERE id = ?",
            [createdId]
        );

        res.json({
            message: "User berhasil ditambahkan!",
            user: newUser[0]
        });

    } catch (error) {
        console.error("ADD USER ERROR:", error);
        res.status(500).json({ message: "Gagal menambahkan user." });
    }
});



// DELETE USER
app.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await db.execute(`DELETE FROM users WHERE id=?`, [id]);

        res.json({ message: "User berhasil dihapus" });

    } catch (error) {
        console.error("DELETE USER ERROR:", error);
        res.status(500).json({ message: "Gagal menghapus user." });
    }
});




// =====================================================
// ================ CRUD GUDANG =========================
// =====================================================

// ----------- GET ALL GUDANG ------------
app.get('/gudang', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM gudang ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        console.error("GET GUDANG ERROR:", error);
        res.status(500).json({ message: 'Gagal mengambil data gudang.' });
    }
});

// ----------- GET GUDANG BY ID ----------
app.get('/gudang/:id', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM gudang WHERE id = ?', [req.params.id]);
        res.json(rows[0]);
    } catch (error) {
        console.error("GET GUDANG BY ID ERROR:", error);
        res.status(500).json({ message: 'Gagal mengambil data gudang.' });
    }
});

// ----------- CREATE GUDANG -------------
app.post("/gudang", upload.fields([
    { name: "gambar_1", maxCount: 1 },
    { name: "gambar_2", maxCount: 1 },
    { name: "gambar_3", maxCount: 1 },
  ]), async (req, res) => {
    try {
      const {
        nama,
        lokasi,
        harga,
        per,
        luas,
        fasilitas,
        deskripsi
      } = req.body;
  
      const gambar1 = req.files?.gambar_1?.[0]?.filename || null;
      const gambar2 = req.files?.gambar_2?.[0]?.filename || null;
      const gambar3 = req.files?.gambar_3?.[0]?.filename || null;
  
      const sql = `
        INSERT INTO gudang 
        (gambar_1, gambar_2, gambar_3, nama, deskripsi, lokasi, harga, per, luas, fasilitas, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Tersedia')
      `;
    
      await db.execute(sql, [
        gambar1,
        gambar2,
        gambar3,
        nama,
        deskripsi,
        lokasi,
        harga,
        per,
        luas,
        fasilitas
      ]);
  
      res.status(201).json({ message: "Gudang berhasil ditambahkan" });
  
    } catch (error) {
      console.error("ERROR POST GUDANG:", error);
      res.status(500).json({ message: "Terjadi kesalahan server" });
    }
  });


// ----------- UPDATE GUDANG -------------
app.put("/gudang/:id", upload.fields([
    { name: "gambar_1", maxCount: 1 },
    { name: "gambar_2", maxCount: 1 },
    { name: "gambar_3", maxCount: 1 },
  ]), async (req, res) => {
    try {
      const { id } = req.params;
      const { nama, lokasi, harga, per, luas, fasilitas, deskripsi, gambar_1_lama, gambar_2_lama, gambar_3_lama } = req.body;
  
      const gambar1 = req.files?.gambar_1?.[0]?.filename || gambar_1_lama;
      const gambar2 = req.files?.gambar_2?.[0]?.filename || gambar_2_lama;
      const gambar3 = req.files?.gambar_3?.[0]?.filename || gambar_3_lama;
  
      const sql = `
      UPDATE gudang SET 
      nama=?, lokasi=?, harga=?, per=?, luas=?, fasilitas=?, deskripsi=?,
      gambar_1=?, gambar_2=?, gambar_3=?
      WHERE id=?
    `;

    await db.execute(sql, [
      nama,
      lokasi,
      harga,
      per,
      luas,
      fasilitas,
      deskripsi,
      gambar1,
      gambar2,
      gambar3,
      id
    ]);
  
    res.status(200).json({
      success: true,
      message: "Gudang berhasil diperbarui",
    });

  } catch (error) {
    console.error("PUT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
    });
  }
});

// ----------- DELETE GUDANG -------------
  app.delete("/gudang/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await db.execute("DELETE FROM gudang WHERE id = ?", [id]);
      res.json({ message: "Gudang berhasil dihapus" });
    } catch (err) {
      res.status(500).json({ message: "Gagal menghapus gudang" });
    }
  });


// =====================================================
// ================ CRUD FAVORITE =======================
// =====================================================

// GET LIST FAVORITE BY USER
app.get('/favorite/:id_user', async (req, res) => {
    try {
        const { id_user } = req.params;

        const [rows] = await db.execute(
            `SELECT id_gudang FROM favorite WHERE id_user = ?`,
            [id_user]
        );

        res.json(rows);

    } catch (error) {
        console.error("GET FAVORITE ERROR:", error);
        res.status(500).json({ message: 'Gagal mengambil data favorite.' });
    }
});

// CEK APAKAH GUDANG SUDAH DIFAVORITKAN
app.get('/favorite/check/:id_user/:id_gudang', async (req, res) => {
    try {
        const { id_user, id_gudang } = req.params;

        const [rows] = await db.execute(
            `SELECT id FROM favorite WHERE id_user = ? AND id_gudang = ?`,
            [id_user, id_gudang]
        );

        res.json({ isFavorite: rows.length > 0 });

    } catch (error) {
        console.error("CHECK FAVORITE ERROR:", error);
        res.status(500).json({ message: 'Gagal mengecek status favorite.' });
    }
});

// TAMBAH FAVORITE
app.post('/favorite', async (req, res) => {
    try {
        const { id_user, id_gudang } = req.body;

        const [result] = await db.execute(
            `INSERT INTO favorite (id_user, id_gudang, created_at, updated_at)
             VALUES (?, ?, NOW(), NOW())`,
            [id_user, id_gudang]
        );

        res.json({ message: "Favorite ditambahkan.", id: result.insertId });

    } catch (error) {
        console.error("ADD FAVORITE ERROR:", error);
        res.status(500).json({ message: 'Gagal menambah favorite.' });
    }
});

// HAPUS FAVORITE
app.delete('/favorite/:id_user/:id_gudang', async (req, res) => {
    try {
        const { id_user, id_gudang } = req.params;

        await db.execute(
            `DELETE FROM favorite WHERE id_user = ? AND id_gudang = ?`,
            [id_user, id_gudang]
        );

        res.json({ message: "Favorite dihapus." });

    } catch (error) {
        console.error("DELETE FAVORITE ERROR:", error);
        res.status(500).json({ message: 'Gagal menghapus favorite.' });
    }
});

// =====================================================
// ================ CRUD IKLAN ========================
// =====================================================

// GET ALL IKLAN (JOIN dengan admin & gudang, termasuk semua data gudang)
app.get('/iklan', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT 
                i.id, i.id_admin, u.name AS nama_admin,
                i.id_gudang, 
                g.nama AS nama_gudang,
                g.lokasi, g.harga, g.status,
                g.per, g.luas, g.fasilitas,
                g.gambar_1, g.gambar_2, g.gambar_3,
                i.created_at, i.updated_at
            FROM iklan i
            JOIN users u ON i.id_admin = u.id
            JOIN gudang g ON i.id_gudang = g.id
            ORDER BY i.id DESC
        `);
        res.json(rows);
    } catch (error) {
        console.error("GET IKLAN ERROR:", error);
        res.status(500).json({ message: 'Gagal mengambil data iklan.' });
    }
});


// GET IKLAN BY ID
app.get('/iklan/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.execute(`
            SELECT i.id, i.id_admin, u.name AS nama_admin,
                   i.id_gudang, g.nama AS nama_gudang,
                   i.created_at, i.updated_at
            FROM iklan i
            JOIN users u ON i.id_admin = u.id
            JOIN gudang g ON i.id_gudang = g.id
            WHERE i.id = ?
        `, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Iklan tidak ditemukan.' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error("GET IKLAN BY ID ERROR:", error);
        res.status(500).json({ message: 'Gagal mengambil data iklan.' });
    }
});

// CREATE IKLAN
app.post('/iklan', async (req, res) => {
    try {
        const { id_admin, id_gudang } = req.body;

        if (!id_admin || !id_gudang) {
            return res.status(400).json({ message: 'id_admin dan id_gudang wajib diisi.' });
        }

        const [result] = await db.execute(`
            INSERT INTO iklan (id_admin, id_gudang, created_at, updated_at)
            VALUES (?, ?, NOW(), NOW())
        `, [id_admin, id_gudang]);

        res.status(201).json({ message: 'Iklan berhasil ditambahkan.', id: result.insertId });
    } catch (error) {
        console.error("CREATE IKLAN ERROR:", error);
        res.status(500).json({ message: 'Gagal menambahkan iklan.' });
    }
});


// DELETE IKLAN
app.delete('/iklan/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.execute(`DELETE FROM iklan WHERE id = ?`, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Iklan tidak ditemukan.' });
        }

        res.json({ message: 'Iklan berhasil dihapus.' });
    } catch (error) {
        console.error("DELETE IKLAN ERROR:", error);
        res.status(500).json({ message: 'Gagal menghapus iklan.' });
    }
});


app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});

