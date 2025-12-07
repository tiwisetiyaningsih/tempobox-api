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
          <p style={{fontSize:'18px', paddingBottom:'25px'}}>
            Cari, bandingkan, dan hubungi pemilik langsung lewat <br />WhatsApp tanpa takut penipuan.
          </p>

          <a 
            href="#daftarGudang" 
            className="btn btn-outline-light fw-bold hero-btn d-flex justify-content-center align-items-center" 
            // style={{ border: '3px solid white', borderRadius: '8px', height: '50px', width: '40%', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow:'ellipsis'}}
          >
            Lihat Daftar Gudang Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}
