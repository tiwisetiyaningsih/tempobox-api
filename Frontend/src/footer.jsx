import React from "react";
import email from "./assets/email.svg"
import whatsapp from "./assets/whatsapp.svg"
import "./hover.css"

export default function Footer() {
  return (
    <footer className="py-5 bg-white">
      <div className="container">

        {/* Bagian Hubungi Kami */}
        <div className="text-center mb-5">
          <h4 className="fw-bold mb-4" style={{ fontSize: '42px' }}>Hubungi Kami</h4>
          <div className="d-flex justify-content-center gap-4 flex-wrap">

            {/* Kartu Chat WhatsApp */}
            <a 
              href="https://wa.me/6281225351055" 
              className="text-decoration-none"
              style={{ flexGrow: 1, maxWidth: '350px' }} 
            >
              <div 
                className="d-flex align-items-center justify-content-center p-4 border border-success rounded-3 text-success kontak"
                style={{ minHeight: '120px' }} 
              >
                <i className="bi bi-whatsapp fs-1 me-4" style={{color:'#25D366', fontSize: '48px'}}></i> 
                <div className="text-start">
                  <p className="mb-1 fw-bold" style={{ fontSize:'22px' }}>Chat WhatsApp</p>
                  <p className="mb-0" style={{ fontSize:'18px' }}>+6281225351055</p>
                </div>
              </div>
            </a>

            {/* Kartu Email Kami */}
            <a 
              href="mailto:tempobox@gmail.com" 
              className="text-decoration-none"
              style={{ flexGrow: 1, maxWidth: '350px' }} 
            >
              <div 
                className="d-flex align-items-center justify-content-center p-4 border border-danger rounded-3 text-danger kontak"
                style={{ minHeight: '120px' }} 
              >
                <img src={email} alt="Email" className="me-4" style={{ width: '48px', height: '48px' }}/> 
                <div className="text-start">
                  <p className="mb-1 fw-bold" style={{ fontSize:'22px' }}>Email Kami</p>
                  <p className="mb-0" style={{ fontSize:'18px' }}>tempobox@gmail.com</p>
                </div>
              </div>
            </a>

          </div>
        </div>

        <hr className="my-5" />

        {/* Footer bawah */}
        <div className="row">
          <div className="col-md-6 text-start mb-4 mb-md-0">
            <h5 className="fw-bold text-primary" style={{ fontSize: '22px' }}>TempoBox</h5>
            <p className="text-muted" style={{ fontSize: '17px' }}>Solusi mencari gudang terpercaya</p>
          </div>

          <div className="col-md-6 text-start">
            <h5 className="fw-bold text-primary" style={{ fontSize: '22px' }}>Tautan cepat</h5>
            <ul className="list-unstyled">
              <li className="mb-1"><a href="#" className="text-decoration-none text-muted" style={{ fontSize: '17px' }}>Home</a></li>
              <li className="mb-1"><a href="#keunggulanKami" className="text-decoration-none text-muted" style={{ fontSize: '17px' }}>Keunggulan Kami</a></li>
              <li className="mb-1"><a href="#tentangKami" className="text-decoration-none text-muted" style={{ fontSize: '17px' }}>Tentang Kami</a></li>
              <li className="mb-1"><a href="#footer" className="text-decoration-none text-muted" style={{ fontSize: '17px' }}>Kontak</a></li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
}
