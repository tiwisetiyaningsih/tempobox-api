import React from "react";
import hero3d from "./assets/ilustrasi.svg"; 
import './style.css';

export default function Header() {
  return (
    <section className="hero-section text-white">
      <div className="overlay"></div>
      <div className="container position-relative">
        <h1 className="fw-bold display-5 mb-3" style={{fontSize:'54px'}}>
          Temukan Gudang Aman di <br /> Bandung
        </h1>
        <p style={{fontSize:'18px'}}>Cari, bandingkan, dan hubungi pemilik langsung lewat <br></br>WhatsApp tanpa takut penipuan.</p>

        <a 
              href="#daftarGudang" 
              className="btn btn-outline-light fw-bold mt-3 py-2 px-4" 
              style={{ border: '2px solid white' }}
            >
              Lihat Daftar Gudang Sekarang
            </a>
      </div>
      <img src={hero3d} alt="Hero ilustrasi" className="hero-img"  style={{marginBottom:'50px', width:'433px', height:'415px'}}/>
    </section>
  );
}
