import React from "react";
import logoTempoBox from './assets/Logo.svg'
import { Link } from "react-router-dom";


function navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
        <div className="container">
        <Link className="navbar-brand fw-bold text-primary d-flex align-items-center" to="#navbar">
          <img src={logoTempoBox} className="logoTempoBox" alt="TempoBox logo" style={{width:'145px', height:'32px'}}/>
        </Link>
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
              <Link className="nav-link me-2" to="#" style={{fontSize:'20px'}}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link me-2" to="#keunggulanKami" style={{fontSize:'20px'}}>Keunggulan Kami</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link me-2" to="#tentangKami" style={{fontSize:'20px'}}>Tentang Kami</Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link" to="#footer" style={{fontSize:'20px'}}>Kontak</Link>
            </li>
          </ul>
          {/* Tombol kanan */}
          <div className="d-flex">
            <Link  to="/login" className="btn btn-outline-primary me-3 px-4" style={{fontSize:'20px'}}>
              Masuk
            </Link>
            <Link  to="/register" className="btn btn-primary px-4" style={{fontSize:'20px'}}>
              Daftar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default navbar;