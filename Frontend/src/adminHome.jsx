import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoTempoBox from './assets/Logo.svg';
import "./AdminHome.css";


function AdminHome() {
  const navigate = useNavigate();

  const [adminInfo, setAdminInfo] = useState({ name: '', email: '' });
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [gudang, setGudang] = useState([]);
  const [iklan, setIklan] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.role !== "admin") navigate("/login");
      setAdminInfo({ name: userData.name, email: userData.email });
    } else {
      navigate("/login");
    }

    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [gudangRes, iklanRes] = await Promise.all([
        axios.get("https://tempobox-api.up.railway.app/gudang"),
        axios.get("https://tempobox-api.up.railway.app/iklan")
      ]);
      setGudang(gudangRes.data);
      setIklan(iklanRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTambahIklan = async (idGudang) => {
    const confirmAdd = window.confirm("Yakin ingin menambahkan gudang ini ke daftar iklan?");
    if (!confirmAdd) return;
  
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      await axios.post("https://tempobox-api.up.railway.app/iklan", {
        id_admin: storedUser.id,
        id_gudang: idGudang
      });
  
      alert("Iklan berhasil ditambahkan!");
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan iklan!");
    }
  };
  
  
  const handleHapusIklan = async (idIklan) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus iklan ini?");
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`https://tempobox-api.up.railway.app/iklan/${idIklan}`);
      alert("Iklan berhasil dihapus!");
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus iklan!");
    }
  };


  const jumlahIklan = iklan.length;
  const jumlahTersedia = gudang.filter(g => g.status === "Tersedia").length;
  const jumlahTerisi = gudang.filter(g => g.status === "Terisi").length;

  const filteredGudang = gudang.filter(g => g.nama.toLowerCase().includes(searchTerm.toLowerCase()));


  return (
    <div className="container-fluid">
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* CONTENT AREA */}
        <div>
          <h3 className="fw-medium">Selamat Datang, {adminInfo.name}</h3>
          <p className="text-muted">
            Ini adalah area ringkasan untuk administrator TempoBox.
          </p>
        </div>
      </div>
  
      {/* KOTAK JUMLAH IKLAN, JUMLAH GUDANG TERSEDIA, JUMLAH GUDANG TERISI */}
      <div className="d-flex gap-3 mb-4">
        <div className="stats-box stats-blue shadow-sm flex-fill">
          <h6 className="text-muted mb-1">Jumlah Iklan</h6>
          <h3 className="fw-bold" style={{color:'#fd0dc9'}}>{jumlahIklan}</h3>
        </div>
        <div className="stats-box stats-purple shadow-sm flex-fill">
          <h6 className="text-muted mb-1">Gudang Tersedia</h6>
          <h3 className="fw-bold" style={{color:'#6016a6'}}>{jumlahTersedia}</h3>
        </div>
        <div className="stats-box stats-orange shadow-sm flex-fill">
          <h6 className="text-muted mb-1">Gudang Terisi</h6>
          <h3 className="fw-bold" style={{color:'#fb591e'}}>{jumlahTerisi}</h3>
        </div>
      </div>
  
      {/* FILTER / SEARCH */}
      <div className="kotak-putih shadow-sm mb-4 d-flex flex-wrap gap-3 justify-content-between">
        <div className="kotak-abu d-flex align-items-center flex-grow-1">
          <i style={{ marginLeft: "5px" }} className="bi bi-search me-1 text-muted"></i>
          <input
            type="text"
            className="form-control border-0 bg-transparent"
            placeholder="Cari nama gudang..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
  
        <div className="kotak-abu d-flex align-items-center">
          <span style={{ marginLeft: "5px" }} className="fw-medium text-dark">
            {filteredGudang.length} Gudang ditemukan
          </span>
        </div>
      </div>
  
       {/* TABEL */}
      <div className="table-container">
        <div className="table-scroll-wrapper">
          <table className="custom-table table-hover">
            <thead>
              <tr>
                <th>No</th>
                <th>Foto</th>
                <th>Nama</th>
                <th>Deskripsi</th>
                <th>Lokasi</th>
                <th>Luas</th>
                <th>Fasilitas</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {filteredGudang.length > 0 ? (
                filteredGudang.map((g, index) => {
                  const iklanData = iklan.find(i => i.id_gudang === g.id);
                  return(
                  <tr key={g.id}>
                    <td className="isi-center">{index + 1}</td>

                    {/* ✅ PAKAI GAMBAR_1 */}
                    <td>
                      {g.gambar_1 ? (
                        <img
                          src={`https://tempobox-api.up.railway.app/uploads/${g.gambar_1}`}
                          className="foto-gudang"
                          alt="Gudang"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>

                    <td>{g.nama}</td>
                    <td className="col-deskripsi">{g.deskripsi}</td>
                    <td className="isi-center">{g.lokasi}</td>
                    <td className="isi-center col-luas">{g.luas} m²</td>
                    <td className="col-deskripsi">{g.fasilitas}</td>

                    <td className="isi-center">
                      <span
                        className={`badge status-badge ${
                          g.status === "Tersedia"
                            ? "status-tersedia"
                            : g.status === "Terisi"
                            ? "status-terisi"
                            : "status-default"
                        }`}
                      >
                        {g.status}
                      </span>
                    </td>

                    {/* Aksi */}
                     <td className='text-center'>
                      {iklanData ? (
                        <button
                          className="btn btn-danger btn-sm"
                          style={{borderRadius:'8px'}}
                          onClick={() => handleHapusIklan(iklanData.id)}
                        >
                          Hapus Iklan
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary btn-sm"
                          style={{borderRadius:'8px'}}
                          onClick={() => handleTambahIklan(g.id)}
                        >
                          Tambah Iklan
                        </button>
                      )}
                    </td>
                  </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="11" className="text-center p-3">
                    Gudang tidak ditemukan...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
  
    </div>
  );
}  

export default AdminHome;
