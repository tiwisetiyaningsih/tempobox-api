import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './KelolaUsers.css'; 
import logoTempoBox from './assets/Logo.svg';

function KelolaUsers() {
  const navigate = useNavigate();

  const [adminInfo, setAdminInfo] = useState({
    name: '',
    email: ''
  });

  const [activeMenu, setActiveMenu] = useState('Kelola User');

  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [editPhoto, setEditPhoto] = useState(null);
  const [editPhotoPreview, setEditPhotoPreview] = useState(null);


  // FILTERED USERS BERDASARKAN SEARCH
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchText.toLowerCase()) ||
    u.email.toLowerCase().includes(searchText.toLowerCase()) ||
    u.phone.toLowerCase().includes(searchText.toLowerCase())
  );

  // HITUNG ADMIN & USER
  const totalAdmin = users.filter(u => u.role === "admin").length;
  const totalUser = users.filter(u => u.role === "user").length;


  // STATE UNTUK EDIT & HAPUS
  const [selectedUser, setSelectedUser] = useState(null);

  // FORM TAMBAH USER
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user",
    password:"",
    photo_profil: null
  });


  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const userData = JSON.parse(storedUser);

      // Jika role bukan admin, kembalikan ke login
      if (userData.role !== "admin") {
        navigate("/login");
        return;
      }

      setAdminInfo({
        name: userData.name,
        email: userData.email
      });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar?");
    if (!confirmLogout) {
      return; // Tetap di halaman jika Cancel
    }

    localStorage.removeItem("user"); 
    navigate('/beranda');
  };

  useEffect(() => {
    fetch("http://tempobox-api.up.railway.app/users")
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(err => console.error("FETCH USERS ERROR:", err));
  }, []);


  // HANDLE TAMBAH USER
  const handleAddUser = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", newUser.name);
    form.append("email", newUser.email);
    form.append("phone", newUser.phone);
    form.append("role", newUser.role);
    form.append("password", newUser.password);

    if (newUser.photo_profil) {
        form.append("photo_profil", newUser.photo_profil);
    }

    try {
        const res = await fetch("http://tempobox-api.up.railway.app/users", {
        method: "POST",
        body: form,
        });

        const data = await res.json();

        if (!res.ok) {
        alert(data.message);
        return;
        }

        alert("User berhasil ditambahkan!");

        // Tutup modal
        document.querySelector("#modalTambahUser .btn-close").click();

        // Reset form
        setNewUser({
        name: "",
        email: "",
        phone: "",
        role: "user",
        password: "",
        photo_profil: "null"
        });

        // Refresh data user
        const updated = await fetch("http://localhost:3001/users").then(r => r.json());
        setUsers(updated);

    } catch (err) {
        console.log(err);
        alert("Gagal menambahkan user.");
    }
  };


  // HANDLE UPDATE USER
    const handleUpdateUser = async () => {
        const form = new FormData();
        form.append("name", selectedUser.name);
        form.append("email", selectedUser.email);
        form.append("phone", selectedUser.phone);
        form.append("role", selectedUser.role);

        if (editPhoto) {
            form.append("photo_profil", editPhoto);
        }

        if (selectedUser.newPassword && selectedUser.newPassword.trim() !== "") {
            form.append("password", selectedUser.newPassword);
        }

        try {
            const res = await fetch(`http://localhost:3001/users/${selectedUser.id}`, {
                method: "PUT",
                body: form
            });

            const data = await res.json();
            alert(data.message);

            // refresh user list
            const list = await fetch("http://localhost:3001/users").then(r => r.json());
            setUsers(list);

        } catch (error) {
            console.error("UPDATE USER ERROR:", error);
        }
    };


  // HANDLE HAPUS USER
  const handleDeleteUser = async () => {
    try {
        const res = await fetch(`http://localhost:3001/users/${selectedUser.id}`, {
        method: "DELETE"
        });

        const data = await res.json();
        alert(data.message);

        // Refresh data
        const list = await fetch("http://localhost:3001/users").then(r => r.json());
        setUsers(list);

    } catch (error) {
        console.error("DELETE USER ERROR:", error);
    }
  };

  const openAddUserModal = () => {
    setNewUser({
        name: "",
        email: "",
        phone: "",
        role: "user",
        password: "",
        photo_profil: null
    });

    const fileInput = document.getElementById("add-user-photo");
    if (fileInput) fileInput.value = "";
  };



  return (
    <div className="d-flex users-dashboard-container">
        {/* CONTENT AREA */}
        <div className="content-area p-4 flex-grow-1">
            <div>
                <div className='lurus mb-4'>
                    <div>
                        <h3>Kelola User</h3>
                        <p className='mb-0'>Daftar pengguna terdaftar dan opsi manajemen.</p>
                    </div>

                    {/* Tombol Tambah User di Kanan */}
                    <div className="text-end">
                    <button 
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#modalTambahUser"
                    onClick={openAddUserModal}>
                        <i className="bi bi-plus me-1"></i> Tambah User
                    </button>
                    </div>
                </div>

                {/* 2 Kotak Info */}
                <div className="d-flex gap-3 mb-4">
                    <div className="stats-box stats-blue shadow-sm flex-fill">
                        <h6 className="text-muted mb-1">Total User</h6>
                        <h3 className="fw-bold" style={{color:'#fd0dc9'}}>{totalUser}</h3>
                    </div>
                    <div className="stats-box stats-red shadow-sm flex-fill">
                        <h6 className="text-muted mb-1">Total Admin</h6>
                        <h3 className="fw-bold" style={{color:'#6016a6'}}>{totalAdmin}</h3>
                    </div>
                    <div className="stats-box stats-orange shadow-sm flex-fill">
                        <h6 className="text-muted mb-1">All</h6>
                        <h3 className="fw-bold" style={{color:'#fb591e'}}>{totalUser + totalAdmin}</h3>
                    </div>
                </div>

                {/* Search & Info Row */}
                <div className="d-flex gap-3 mb-4 luar-search">
                    {/* Search Box */}
                    <div className="search-box d-flex align-items-center flex-grow-1">
                        <i className="bi bi-search me-2"></i>
                        <input
                        type="text"
                        className="search-input"
                        placeholder="Cari user berdasarkan nama, email atau phone"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>

                    {/* Info Box */}
                    <div className="info-box d-flex align-items-center justify-content-center">
                        {filteredUsers.length} User ditemukan
                    </div>
                </div>


                {/* Tabel User */}
                <div className="table-responsive table-wrapper">
                <table className="table table-hover custom-table align-middle">
                    <thead>
                    <tr className='text-center'>
                        <th>No</th>
                        <th>Foto Profil</th>
                        <th>Nama Lengkap</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Aksi</th>
                    </tr>
                    </thead>

                    <tbody>
                    {filteredUsers.length === 0 ? (
                        <tr>
                        <td colSpan="5" className="text-center text-muted">
                            Tidak ada pengguna ditemukan
                        </td>
                        </tr>
                    ) : (
                        filteredUsers.map((u, index) => (
                            <tr key={u.id} className='text-center'>
                                <td>{index + 1}</td>
                                <td>
                                    <img 
                                        src={
                                            u.photo_profil?.startsWith("http")
                                                ? u.photo_profil
                                                : `http://localhost:3001/uploads/${u.photo_profil}`
                                            }
                                        style={{ width: '100px', height: '100px'}}
                                        alt="Profil"
                                    />
                                </td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.phone}</td>
                                <td>{u.role}</td>
                                <td>
                                <div className="d-flex gap-1 justify-content-center">
                                    <button 
                                    className="btn btn-sm aksi-btn-icon" 
                                    title="Edit"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalEditUser"
                                    onClick={() => {
                                        setSelectedUser({ ...u });
                                        setEditPhoto(null);
                                        setEditPhotoPreview(
                                            u.photo_profil?.startsWith("http")
                                                ? u.photo_profil
                                                : `http://localhost:3001/uploads/${u.photo_profil}`
                                        );
                                    }}


                                    >
                                    <i className="bi bi-pencil-square text-success"></i>
                                    </button>

                                    <button 
                                    className="btn btn-sm aksi-btn-icon" title="Hapus"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalHapusUser"
                                    onClick={() => setSelectedUser(u)}
                                    >
                                    <i className="bi bi-trash text-danger"></i>
                                    </button>
                                </div>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>

                </table>
                </div>
            </div>
        </div>


        {/* MODAL TAMBAH USER */}
        <div className="modal fade" id="modalTambahUser" tabIndex="-1">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">

                <div className="modal-header">
                    <h5 className="modal-title">Tambah User</h5>
                    <button className="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div className="modal-body">
                    <div className="row">

                        {/* KOLOM KIRI */}
                        <div className="col-md-6">

                        <label className="form-label fw-medium">Foto Profil</label>
                        <input 
                            id="add-user-photo"
                            type="file"
                            accept="image/*"
                            className="form-control mb-3"
                            onChange={(e) =>
                                setNewUser({ ...newUser, photo_profil: e.target.files[0] })
                            }
                        />

                        <label className="form-label fw-medium">Email</label>
                        <input
                            type="email"
                            className="form-control mb-3"
                            placeholder="Masukkan email"
                            value={newUser.email}
                            onChange={(e) =>
                            setNewUser({ ...newUser, email: e.target.value })
                            }
                        />

                        <label className="form-label fw-medium">Password</label>
                        <input
                            type="password"
                            placeholder="Masukkan password"
                            className="form-control mb-3"
                            value={newUser.password}
                            onChange={(e) =>
                            setNewUser({ ...newUser, password: e.target.value })
                            }
                        />
                        </div>

                        {/* KOLOM KANAN */}
                        <div className="col-md-6">

                        <label className="form-label fw-medium">Nama Lengkap</label>
                        <input
                            className="form-control mb-3"
                            placeholder="Masukkan nama lengkap"
                            value={newUser.name}
                            onChange={(e) =>
                            setNewUser({ ...newUser, name: e.target.value })
                            }
                        />

                        <label className="form-label fw-medium">Nomor Telepon</label>
                        <input
                            className="form-control mb-3"
                            placeholder="Masukkan no telepon"
                            value={newUser.phone}
                            onChange={(e) =>
                            setNewUser({ ...newUser, phone: e.target.value })
                            }
                        />

                        <label className="form-label fw-medium">Role</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                            <i className="bi bi-people-fill"></i>
                            </span>

                            <select
                            className="form-select"
                            value={newUser.role}
                            onChange={(e) =>
                                setNewUser({ ...newUser, role: e.target.value })
                            }
                            >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            </select>

                            
                        </div>

                        </div>
                    </div>
                </div>


                <div className="modal-footer">
                    <button
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    >
                    Batal
                    </button>

                    <button
                    className="btn btn-primary"
                    onClick={handleAddUser}
                    >
                    Simpan
                    </button>
                </div>

                </div>
            </div>
        </div>



        {/* MODAL EDIT USER */}
        <div className="modal fade" id="modalEditUser" tabIndex="-1">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Edit User</h5>
                        <button className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body">
                        {selectedUser && (
                            <div className="row">

                                {/* KIRI */}
                                <div className="col-md-6">

                                    <label className="form-label fw-medium">Foto Profil Saat Ini</label>
                                    <div className="mb-3">
                                        <img
                                            src={
                                                editPhotoPreview ||
                                                `http://localhost:3001/uploads/${selectedUser.photo_profil}`
                                            }
                                            alt="Foto Profil"
                                            style={{
                                                width: "120px",
                                                height: "120px",
                                                objectFit: "cover",
                                                borderRadius: "10px",
                                                border: "1px solid #ddd"
                                            }}
                                        />
                                    </div>

                                    <label className="form-label fw-medium mt-1">Ganti Foto Profil</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="form-control mb-3"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setEditPhoto(file);
                                            setEditPhotoPreview(URL.createObjectURL(file));
                                        }}
                                    />

                                    <label className="form-label fw-medium">Email</label>
                                    <input
                                        type="email"
                                        className="form-control mb-3"
                                        value={selectedUser.email}
                                        onChange={(e) =>
                                            setSelectedUser({ ...selectedUser, email: e.target.value })
                                        }
                                    />

                                </div>

                                {/* KANAN */}
                                <div className="col-md-6">

                                    <label className="form-label fw-medium">Nama Lengkap</label>
                                    <input
                                        className="form-control mb-3"
                                        value={selectedUser.name}
                                        onChange={(e) =>
                                            setSelectedUser({ ...selectedUser, name: e.target.value })
                                        }
                                    />

                                    <label className="form-label fw-medium">Nomor Telepon</label>
                                    <input
                                        className="form-control mb-3"
                                        value={selectedUser.phone}
                                        onChange={(e) =>
                                            setSelectedUser({ ...selectedUser, phone: e.target.value })
                                        }
                                    />

                                    <label className="form-label fw-medium">Role</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">
                                            <i className="bi bi-people-fill"></i>
                                        </span>
                                        <select
                                            className="form-select"
                                            value={selectedUser.role}
                                            onChange={(e) =>
                                                setSelectedUser({ ...selectedUser, role: e.target.value })
                                            }
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>

                                    <label className="form-label fw-medium">Password Baru</label>
                                    <input
                                        type="password"
                                        className="form-control mb-3"
                                        placeholder="Kosongkan jika tidak ingin mengubah"
                                        value={selectedUser.newPassword || ""}
                                        onChange={(e) =>
                                            setSelectedUser({ ...selectedUser, newPassword: e.target.value })
                                        }
                                    />

                                </div>
                            </div>
                        )}
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" data-bs-dismiss="modal">
                            Batal
                        </button>

                        <button
                            className="btn btn-success"
                            data-bs-dismiss="modal"
                            onClick={handleUpdateUser}
                        >
                            Update
                        </button>
                    </div>

                </div>
            </div>
        </div>



        {/* MODAL HAPUS USER */}
        <div className="modal fade" id="modalHapusUser" tabIndex="-1">
            <div className="modal-dialog modal-sm">
                <div className="modal-content">


                    <div className="text-center mt-3">
                        <i class="bi bi-exclamation-triangle-fill" style={{fontSize:'30px', color:'#cd0000ff'}}></i>
                        <p>Yakin ingin menghapus user ini?</p>
                    </div>

                    <div className="modal-footer d-flex justify-content-end">
                        <button className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Batal</button>

                        <button
                            className="btn btn-danger btn-sm"
                            data-bs-dismiss="modal"
                            onClick={handleDeleteUser}
                        >
                            Hapus
                        </button>
                    </div>

                </div>
            </div>
        </div>
      </div>
    
  );
}

export default KelolaUsers;
