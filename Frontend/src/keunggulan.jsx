import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css"; 

export default function Keunggulan() {
  const features = [
    {
      icon: "bi-whatsapp",
      title: "Kontak Langsung Pemilik",
    },
    {
      icon: "bi-check-circle",
      title: "Data Terverifikasi",
    },
    {
      icon: "bi-tag-fill",
      title: "Harga Transparan",
    },
  ];

  const descriptionText = (
    <>
      Kami hadir sebagai jembatan terpercaya antara pemilik gudang dan penyewa,
      memastikan setiap<br />informasi akurat dan kontak pemilik dapat dihubungi langsung.
    </>
  );

  return (
    <section
      id="keunggulan"
      className="py-5"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="container text-center">
        <h2 className="fw-bold mb-3" style={{ fontSize: '42px' }}>Keunggulan TempoBox</h2>
        <p className="text-muted mb-5" style={{ margin: "0 auto", fontSize: '18px' }}>
          {descriptionText}
        </p>

        <div className="row justify-content-center g-3">
          {features.map((item, index) => (
            <div key={index} className="col-12 col-md-4 col-lg-3">
              <a
                href="#"
                className="btn btn-primary d-flex align-items-center justify-content-center text-center py-3 px-2 w-100"
                style={{ fontSize: '18px', minHeight: '60px' }}
              >
                <i className={`${item.icon} fs-5 me-3`}></i> 
                {item.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}