import React from "react";

// Asumsi menggunakan Bootstrap 5.x untuk styling dan Bootstrap Icons
export default function CaraKerja() {
  const steps = [
    "Tim Kami Mengumpulkan Data Gudang",
    "Kami Verifikasi Pemilik & Kontak WA-nya",
    "Kamu Lihat & Pilih Gudang yang Cocok",
    "Hubungi Pemilik Langsung via WhatsApp",
  ];

  // Array untuk kelas ikon Bootstrap Icons
  const iconClasses = [
    "bi bi-1-circle-fill",
    "bi bi-2-circle-fill",
    "bi bi-3-circle-fill",
    "bi bi-4-circle-fill",
  ];

  return (
    <section className="py-5 bg-white text-center">
      <div className="container">
        {/* Judul Utama */}
        <h2 className="fw-bold mb-3" style={{fontSize:'42px'}}>Bagaimana Tempobox Bekerja?</h2>
        {/* Sub-judul/Deskripsi */}
        <p className="text-muted mb-5" style={{fontSize:'18px'}}>
          Kami menjembatani penyewa dan pemilik gudang dengan proses yang cepat dan aman.
        </p>

        {/* Langkah-langkah Proses */}
        <div className="row justify-content-center g-3">
          {steps.map((item, i) => (
            <div key={i} className="col-12 col-sm-6 col-md-3">
              {/* Kontainer Langkah dengan border biru */}
              <div
                className="d-flex align-items-center p-3 text-primary border border-primary rounded-2"
                style={{ height: "100%", textAlign: "left" }}
              >
                {/* Ikon Lingkaran Angka dari Bootstrap Icons */}
                <i
                  className={`${iconClasses[i]} fs-4 me-3`} // fs-4 untuk ukuran ikon
                  style={{ flexShrink: 0 }} // Mencegah ikon menyusut
                ></i>
                
                {/* Teks Langkah */}
                <span className="fw-normal text-start" style={{fontSize:'18px'}}>
                  {item}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}