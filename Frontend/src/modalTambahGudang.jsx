export default function ModalTambahGudang({ onSubmit, loading }) {
  return (
    <div
      className="modal fade"
      id="modalTambahGudang"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">

          <form onSubmit={onSubmit} encType="multipart/form-data">

            <div className="modal-header">
              <h5 className="modal-title">Tambah Gudang</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body row g-3">

              <div className="col-md-6">
                <label>Nama Gudang</label>
                <input name="nama" className="form-control" required />
              </div>

              <div className="col-md-6">
                <label>Lokasi</label>
                <input name="lokasi" className="form-control" required />
              </div>

              <div className="col-md-6">
                <label>Harga</label>
                <input name="harga" type="number" className="form-control" required />
              </div>

              <div className="col-md-6">
                  <label>Per</label>
                  <select className="form-select form-select-sm" name="per">
                    <option value="/hari">hari</option>
                    <option value="/bulan">bulan</option>
                    <option value="/tahun">tahun</option>
                  </select>
                </div>

              <div className="col-md-6">
                <label>Luas</label>
                <input name="luas" type="number" className="form-control" required />
              </div>

              <div className="col-md-6">
                <label>Fasilitas</label>
                <input name="fasilitas" className="form-control" />
              </div>

              <div className="col-12">
                <label>Deskripsi</label>
                <textarea name="deskripsi" className="form-control" rows="3"></textarea>
              </div>

              {/* ✅ HARUS SESUAI DENGAN BACKEND */}
              <div className="col-md-4">
                <label>Gambar 1</label>
                <input type="file" name="gambar_1" className="form-control" />
              </div>

              <div className="col-md-4">
                <label>Gambar 2</label>
                <input type="file" name="gambar_2" className="form-control" />
              </div>

              <div className="col-md-4">
                <label>Gambar 3</label>
                <input type="file" name="gambar_3" className="form-control" />
              </div>

            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Batal
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}