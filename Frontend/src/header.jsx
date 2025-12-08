import React from "react";
import hero3d from "./assets/Ilustrasi.svg"; 
import './style.css';

export default function Header() {
  return (
    <section className="hero-section text-white">

      <div className="container hero-content">
        {/* Teks kiri */}
        <div className="hero-text">
          <h1 className="fw-bold mb-4" style={{fontSize:'54px'}}>
            Temukan Gudang Aman di Bandung
          </h1>
          <p style={{fontSize:'18px', paddingBottom:'25px', maxWidth:'500px'}}>
            Cari, bandingkan, dan hubungi pemilik langsung lewat WhatsApp tanpa takut penipuan.
          </p>
        </div>
          <a 
            href="#daftarGudang" 
            className="btn btn-outline-light fw-bold hero-btn d-flex justify-content-center align-items-center" 
          >
            Lihat Daftar Gudang Sekarang
          </a>
      
      </div>
    </section>
  );
}
