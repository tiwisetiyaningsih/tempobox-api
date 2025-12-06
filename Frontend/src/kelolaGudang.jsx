import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./KelolaGudang.css";
import ModalTambahGudang from "./modalTambahGudang";
import ModalDetailGudang from "./modalDetailGudang";
import ModalDeleteGudang from "./modalDeleteGudang";
import ModalEditGudang from "./modalEditGudang";

export default function KelolaGudang() {
  const [warehouses, setWarehouses] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGudang, setSelectedGudang] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  // =========================
  // FETCH DATA GUDANG
  // =========================
  const fetchGudang = async () => {
    try {
      const res = await fetch("http://localhost:3001/gudang");
      const data = await res.json();
      setWarehouses(data);
    } catch (err) {
      console.error("FETCH GUDANG ERROR:", err);
    }
  };

  useEffect(() => {
    fetchGudang();
  }, []);

  // =========================
  // FILTER
  // =========================
  const filtered = warehouses.filter(
    (g) =>
      g.nama?.toLowerCase().includes(search.toLowerCase()) ||
      g.lokasi?.toLowerCase().includes(search.toLowerCase())
  );

  // =========================
  // TAMBAH GUDANG
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    const formData = new FormData(e.target);

    try {
      const res = await fetch("http://localhost:3001/gudang", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Gagal menambahkan gudang");
        return;
      }

      alert("Gudang berhasil ditambahkan ✅");

      e.target.reset();

      const closeBtn = document.querySelector(
        '#modalTambahGudang [data-bs-dismiss="modal"]'
      );
      closeBtn?.click();

      fetchGudang();
    } catch (err) {
      console.error("HANDLE SUBMIT ERROR:", err);
      alert("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">

      {/* Header + Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3 className="fw-medium">Kelola Gudang</h3>
          <p className="text-muted">Manajemen kelola Gudang</p>
        </div>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalTambahGudang"
        >
          <i className="bi bi-plus-lg me-1"></i> Tambahkan Gudang
        </button>
      </div>

      <div className="kotak-putih shadow-sm mb-4 d-flex flex-wrap gap-3 justify-content-between">
        <div className="kotak-abu d-flex align-items-center flex-grow-1">
          <i style={{ marginLeft: "5px" }} className="bi bi-search me-1 text-muted"></i>
          <input
            type="text"
            className="form-control border-0 bg-transparent"
            placeholder="Cari Gudang atau lokasi Gudang"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="kotak-abu d-flex align-items-center">
          <span style={{ marginLeft: "5px" }} className="fw-medium text-dark">
            {filtered.length} Gudang ditemukan
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
              {filtered.length > 0 ? (
                filtered.map((gudang, index) => (
                  <tr key={gudang.id}>
                    <td className="isi-center">{index + 1}</td>

                    {/* ✅ PAKAI GAMBAR_1 */}
                    <td>
                      {gudang.gambar_1 ? (
                        <img
                          src={`http://localhost:3001/uploads/${gudang.gambar_1}`}
                          className="foto-gudang"
                          alt="Gudang"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>

                    <td>{gudang.nama}</td>
                    <td className="col-deskripsi">{gudang.deskripsi}</td>
                    <td className="isi-center">{gudang.lokasi}</td>
                    <td className="isi-center col-luas">{gudang.luas} m²</td>
                    <td className="col-deskripsi">{gudang.fasilitas}</td>

                    <td className="isi-center">
                      <span
                        className={`badge status-badge ${
                          gudang.status === "Tersedia"
                            ? "status-tersedia"
                            : gudang.status === "Terisi"
                            ? "status-terisi"
                            : "status-default"
                        }`}
                      >
                        {gudang.status}
                      </span>
                    </td>

                    {/* Aksi */}
                    <td>
                      <div className="d-flex gap-1 justify-content-center">
                        <button
                          className="btn btn-sm aksi-btn-icon"
                          title="Lihat"
                          onClick={() => {
                            setSelectedGudang(gudang);
                            setShowDetail(true);
                          }}
                        >
                          <i className="bi bi-eye text-primary"></i>
                        </button>

                        <button
                          className="btn btn-sm aksi-btn-icon"
                          title="Edit"
                          data-bs-toggle="modal"
                          data-bs-target="#modalEditGudang"
                          onClick={() => setSelectedGudang(gudang)}
                        >
                          <i className="bi bi-pencil-square text-success"></i>
                        </button>

                        <button
                          className="btn btn-sm aksi-btn-icon"
                          title="Hapus"
                          onClick={() => {
                            setSelectedGudang(gudang);
                            setShowDelete(true);
                          }}
                        >
                          <i className="bi bi-trash text-danger"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
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

      {/* MODAL */}
      <ModalTambahGudang onSubmit={handleSubmit} loading={loading} />

      <ModalDetailGudang
        show={showDetail}
        onClose={() => setShowDetail(false)}
        data={selectedGudang}
      />

      <ModalEditGudang
        data={selectedGudang}
        onSuccess={fetchGudang}
      />

      <ModalDeleteGudang
        show={showDelete}
        data={selectedGudang}
        onClose={() => setShowDelete(false)}
        onSuccess={fetchGudang}
      />
    </div>
  );
}