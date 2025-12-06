import React from "react";
import zhafran from "./assets/zhafran.svg";
import axel from "./assets/axel.svg";
import dwi from "./assets/dwi.svg";
import radhiyah from "./assets/radhiyah.svg";
import naila from "./assets/naila.svg";

export default function TentangKami() {
  const team = [
    { nama: "M. Zhafran Dika N.", jabatan: "Chief Executive Officer", image: zhafran },
    { nama: "Axel Naufal Putra", jabatan: "Chief Marketing Officer", image: axel },
    { nama: "Dwi Fatima Azzahra", jabatan: "Chief Technology Officer", image: dwi },
    { nama: "Radhiyah Wafa A.", jabatan: "Chief Operating Officer", image: radhiyah },
    { nama: "Naila Rahma Fadhilah", jabatan: "Chief Financial Officer", image: naila },
  ];

  const descriptionText = (
    <>
      Tempobox hadir untuk menjembatani kebutuhan penyewa gudang dan pemiliknya di Bandung dan sekitarnya.
      Kami mengumpulkan dan <br/> menampilkan daftar gudang yang diverifikasi oleh tim kami, memastikan semua informasi akurat, 
      termasuk foto, ukuran, fasilitas, dan kontak pemilik.
    </>
  );

  return (
    <section className="py-5 text-center bg-light">
      <div className="container">
        {/* Judul Utama */}
        <h2 className="fw-bold mb-3" style={{fontSize:'42px'}}>Tentang Kami</h2>
        
        {/* Sub-judul/Deskripsi */}
        <p className="text-muted mb-5 px-md-5" style={{fontSize:'18px'}}>
          {descriptionText}
        </p>

        {/* Anggota Tim */}
        <div className="row justify-content-center g-4 mb-5">
          {team.map((item, i) => (
            <div 
              key={i} 
              className="col-10 col-sm-6 col-md-4 col-lg-auto"
              style={{ width: '20%' }}
            >
              <div className="card h-100 border-0 shadow-sm">
                
                {/* Image */}
                <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                    <img 
                      src={item.image} 
                      alt={item.nama} 
                      className="card-img-top w-100 h-100 object-fit-cover" 
                      style={{ borderRadius: '0.375rem 0.375rem 0 0' }}
                    />
                </div>
                
                {/* Nama dan Jabatan */}
                <div className="card-body p-3">
                  <h6 className="fw-bold mb-1" style={{fontSize:'18px'}}>{item.nama}</h6>
                  <p className="text-secondary small mb-0" style={{fontSize:'18px'}}>{item.jabatan}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}