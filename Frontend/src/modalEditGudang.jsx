import React, { useEffect, useState } from "react";
import "./ModalEditGudang.css";

export default function ModalEditGudang({ data, onSuccess }) {
  const [form, setForm] = useState({});
  const [preview, setPreview] = useState({
    gambar_1: "",
    gambar_2: "",
    gambar_3: "",
  });

  // ===============================
  // ✅ LOAD DATA & FOTO LAMA
  // ===============================
  useEffect(() => {
    if (!data) return;

    setForm({
      ...data,
      foto1: null,
      foto2: null,
      foto3: null,
    });

    setPreview({
      gambar_1: data.gambar_1
        ? `http://localhost:3001/uploads/${data.gambar_1}`
        : "",
      gambar_2: data.gambar_2
        ? `http://localhost:3001/uploads/${data.gambar_2}`
        : "",
      gambar_3: data.gambar_3
        ? `http://localhost:3001/uploads/${data.gambar_3}`
        : "",
    });
  }, [data]);

  // ===============================
  // ✅ INPUT TEXT
  // ===============================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ===============================
  // ✅ INPUT FILE + PREVIEW
  // ===============================
  const handleFile = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,
      [name]: file,
    }));

    setPreview((prev) => ({
      ...prev,
      [name]: URL.createObjectURL(file),
    }));
  };

  // ===============================
  // ✅ SUBMIT
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // TEXT
    formData.append("nama", form.nama);
    formData.append("lokasi", form.lokasi);
    formData.append("harga", form.harga);
    formData.append("per", form.per);
    formData.append("luas", form.luas);
    formData.append("fasilitas", form.fasilitas);
    formData.append("deskripsi", form.deskripsi);

    // FOTO BARU / LAMA
    ["gambar_1", "gambar_2", "gambar_3"].forEach((f) => {
      if (form[f] instanceof File) {
        formData.append(f, form[f]);
      } else {
        formData.append(`${f}_lama`, data[f]);
      }
    });

    try {
      const res = await fetch(
        `http://localhost:3001/gudang/${data.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Gagal edit");
        return;
      }

      alert("Gudang berhasil diperbarui ✅");

      document
        .querySelector('#modalEditGudang [data-bs-dismiss="modal"]')
        ?.click();

      await onSuccess();
    } catch (err) {
      console.error("EDIT ERROR:", err);
      alert("Terjadi kesalahan aplikasi");
    }
  };

  if (!data) return null;

  return (
    <div className="modal fade" id="modalEditGudang" tabIndex="-1">
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="modal-header">
              <h5>Edit Gudang</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {/* ================= BODY ================= */}
            <div className="modal-body modal-scroll-custom container-fluid">
              {/* ROW 1 */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label>Nama</label>
                  <input
                    name="nama"
                    className="form-control"
                    value={form.nama || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label>Lokasi</label>
                  <input
                    name="lokasi"
                    className="form-control"
                    value={form.lokasi || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* ROW 2 */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label>Harga</label>
                  <input
                    name="harga"
                    className="form-control"
                    value={form.harga || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label>Per</label>
                  <select
                    name="per"
                    value={form.per || ""}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="/hari">/hari</option>
                    <option value="/bulan">/bulan</option>
                    <option value="/tahun">/tahun</option>
                  </select>
                </div>
              </div>

              {/* ROW 3 */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label>Luas</label>
                  <input
                    name="luas"
                    className="form-control"
                    value={form.luas || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label>Fasilitas</label>
                  <input
                    name="fasilitas"
                    className="form-control"
                    value={form.fasilitas || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* ROW DESKRIPSI */}
              <div className="row mb-3">
                <div className="col-12">
                  <label>Deskripsi</label>
                  <textarea
                    name="deskripsi"
                    className="form-control"
                    rows="3"
                    value={form.deskripsi || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* ================= FOTO ================= */}
              <div className="mb-2 fw-bold">Foto Gudang</div>
              <div className="row">
                {["gambar_1", "gambar_2", "gambar_3"].map((f) => (
                  <div key={f} className="col-md-4 text-center mb-3">
                    {preview[f] && (
                      <img
                        src={preview[f]}
                        className="img-fluid rounded shadow mb-2"
                        style={{
                          width: "100%",
                          height: 120,
                          objectFit: "cover",
                        }}
                      />
                    )}

                    <input
                      type="file"
                      name={f}
                      className="form-control form-control-sm"
                      onChange={handleFile}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ================= FOOTER ================= */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Batal
              </button>
              <button type="submit" className="btn btn-success">
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}