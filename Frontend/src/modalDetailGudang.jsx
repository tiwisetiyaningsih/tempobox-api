export default function ModalDetailGudang({ show, onClose, data }) {
  if (!show || !data) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Detail Gudang</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">

            {/* ================= SLIDER GAMBAR ================= */}
            <div
              id="sliderGudang"
              className="carousel slide mb-4"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner rounded">

                {data.gambar_1 && (
                  <div className="carousel-item active">
                    <img
                      src={`http://localhost:3001/uploads/${data.gambar_1}`}
                      className="d-block w-100 rounded"
                      style={{ maxHeight: "320px", objectFit: "cover" }}
                      alt="Gudang 1"
                    />
                  </div>
                )}

                {data.gambar_2 && (
                  <div className="carousel-item">
                    <img
                      src={`http://localhost:3001/uploads/${data.gambar_2}`}
                      className="d-block w-100 rounded"
                      style={{ maxHeight: "320px", objectFit: "cover" }}
                      alt="Gudang 2"
                    />
                  </div>
                )}

                {data.gambar_3 && (
                  <div className="carousel-item">
                    <img
                      src={`http://localhost:3001/uploads/${data.gambar_3}`}
                      className="d-block w-100 rounded"
                      style={{ maxHeight: "320px", objectFit: "cover" }}
                      alt="Gudang 3"
                    />
                  </div>
                )}

              </div>

              {/* TOMBOL KIRI KANAN */}
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#sliderGudang"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon"></span>
              </button>

              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#sliderGudang"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon"></span>
              </button>
            </div>

            {/* ================= INFORMASI GUDANG ================= */}
            <div className="row">
              <div className="col-md-6">
                <p><b>Nama:</b> {data.nama}</p>
                <p><b>Lokasi:</b> {data.lokasi}</p>
                <p><b>Luas:</b> {data.luas} m²</p>
                <p><b>Status:</b> 
                  <span className="badge bg-success ms-2">
                    {data.status}
                  </span>
                </p>
              </div>

              <div className="col-md-6">
                <p><b>Harga:</b> Rp {Number(data.harga).toLocaleString()}</p>
                <p><b>Per:</b> {data.per}</p>
                <p><b>Fasilitas:</b> {data.fasilitas}</p>
              </div>
            </div>

            <hr />

            <p><b>Deskripsi:</b></p>
            <p className="text-muted">{data.deskripsi}</p>

          </div>

        </div>
      </div>
    </div>
  );
}