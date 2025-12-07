import React from "react";
import logoTempoBox from "./assets/Logo.svg";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-2">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold text-primary" to="/">
          <img
            src={logoTempoBox}
            alt="TempoBox logo"
            style={{ width: "125px", height: "32px" }}
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
              <a className="nav-link me-3" href="#home" style={{ fontSize: "18px" }}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link me-3" href="#keunggulanKami" style={{ fontSize: "18px" }}>Keunggulan Kami</a>
            </li>
            <li className="nav-item">
              <a className="nav-link me-3" href="#tentangKami" style={{ fontSize: "18px" }}>Tentang Kami</a>
            </li>
            <li className="nav-item me-lg-4">
              <a className="nav-link" href="#footer" style={{ fontSize: "18px" }}>Kontak</a>
            </li>

            {/* Tombol login/daftar */}
            <li className="nav-item d-flex gap-3 mt-2 mt-lg-0">
              <Link to="/login" className="btn btn-outline-primary px-3" style={{ fontSize: "18px" }}>
                Masuk
              </Link>
              <Link to="/register" className="btn btn-primary px-3" style={{ fontSize: "18px" }}>
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
