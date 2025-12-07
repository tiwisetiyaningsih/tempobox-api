import React from "react";
import logoTempoBox from "./assets/Logo.svg";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-4">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold text-primary" to="/">
          <img
            src={logoTempoBox}
            alt="TempoBox logo"
            style={{ width: "165px", height: "52px" }}
          />
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <a className="nav-link me-3" href="#home" style={{ fontSize: "20px" }}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link me-3" href="#keunggulanKami" style={{ fontSize: "22px" }}>Keunggulan Kami</a>
            </li>
            <li className="nav-item">
              <a className="nav-link me-3" href="#tentangKami" style={{ fontSize: "22px" }}>Tentang Kami</a>
            </li>
            <li className="nav-item me-lg-4">
              <a className="nav-link" href="#footer" style={{ fontSize: "22px" }}>Kontak</a>
            </li>

            {/* Tombol login/daftar */}
            <li className="nav-item d-flex gap-2 mt-2 mt-lg-0">
              <Link to="/login" className="btn btn-outline-primary px-4" style={{ fontSize: "25px" }}>
                Masuk
              </Link>
              <Link to="/register" className="btn btn-primary px-4" style={{ fontSize: "25px" }}>
                Daftar
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
