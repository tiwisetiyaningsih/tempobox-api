import React from "react";
import logoTempoBox from './assets/Logo.svg'
import { Link } from "react-router-dom";


function navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
        <div className="container">
        <a className="navbar-brand fw-bold text-primary d-flex align-items-center" href="#navbar">
          <img src={logoTempoBox} className="logoTempoBox" alt="TempoBox logo" style={{width:'145px', height:'32px'}}/>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto  mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link me-2" href="#" style={{fontSize:'20px'}}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link me-2" href="#keunggulanKami" style={{fontSize:'20px'}}>Keunggulan Kami</a>
            </li>
            <li className="nav-item">
              <a className="nav-link me-2" href="#tentangKami" style={{fontSize:'20px'}}>Tentang Kami</a>
            </li>
            <li className="nav-item me-5">
              <a className="nav-link" href="#footer" style={{fontSize:'20px'}}>Kontak</a>
            </li>
          </ul>
          {/* Tombol kanan */}
          <div className="d-flex">
            <a href="/login" className="btn btn-outline-primary me-3 px-4" style={{fontSize:'20px'}}>
              Masuk
            </a>
            <a href="/register" className="btn btn-primary px-4" style={{fontSize:'20px'}}>
              Daftar
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default navbar;