import React from "react";
import email from "./assets/email.svg"
import whatsapp from "./assets/whatsapp.svg"

export default function Footer() {
  return (
    <footer className="py-5 bg-white">
      <div className="container">
        {/* Bagian Hubungi Kami */}
        <div className="text-center mb-5">
          <h4 className="fw-bold mb-4" style={{fontSize:'42px'}}>Hubungi Kami</h4>
          <div className="d-flex justify-content-center gap-4 flex-wrap">
            {/* Kartu Chat WhatsApp */}
            <a 
              href="https://wa.me/6281225351055" 
              className="text-decoration-none"
              style={{ flexGrow: 1, maxWidth: '300px' }} 
            >
              <div 
                className="d-flex align-items-center justify-content-center p-3 border border-success rounded-3 text-success"
                style={{ minHeight: '80px' }} 
              >
                <i className="bi bi-whatsapp fs-1 me-3" style={{color:'#25D366'}}></i> 
                <div className="text-start">
                  <p className="mb-0 fw-bold" style={{fontSize:'18px'}}>Chat WhatsApp</p>
                  <p className="mb-0 small" style={{fontSize:'18px'}}>+6281225351055</p>
                </div>
              </div>
            </a>

            {/* Kartu Email Kami */}
            <a 
              href="mailto:tempobox@gmail.com" 
              className="text-decoration-none"
              style={{ flexGrow: 1, maxWidth: '300px' }} 
            >
              <div 
                className="d-flex align-items-center justify-content-center p-3 border border-danger rounded-3 text-danger"
                style={{ minHeight: '80px' }} 
              >
                <img src={email} className="fs-1 me-3"></img> 
                <div className="text-start">
                  <p className="mb-0 fw-bold" style={{fontSize:'18px'}}>Email Kami</p>
                  <p className="mb-0 small" style={{fontSize:'18px'}}>tempobox@gmail.com</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        <hr className="my-5" />

        <div className="row">
          <div className="col-md-6 text-start mb-4 mb-md-0">
            <h5 className="fw-bold text-primary">TempoBox</h5>
            <p className="text-muted small">Solusi mencari gudang terpercaya</p>
          </div>

          <div className="col-md-6 text-start">
            <h5 className="fw-bold text-primary">Tautan cepat</h5>
            <ul className="list-unstyled">
              <li className="mb-1"><a href="#" className="text-decoration-none text-muted small">Home</a></li>
              <li className="mb-1"><a href="#keunggulanKami" className="text-decoration-none text-muted small">Keunggulan Kami</a></li>
              <li className="mb-1"><a href="#tentangKami" className="text-decoration-none text-muted small">Tentang Kami</a></li>
              <li className="mb-1"><a href="#footer" className="text-decoration-none text-muted small">Kontak</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}