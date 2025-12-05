import React, { useEffect, useState } from "react";
import axios from "axios";


export default function DaftarGudang() {
  const [iklan, setIklan] = useState([]);

  // Ambil data iklan dari backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/iklan");
        setIklan(response.data);
      } catch (error) {
        console.error("Gagal mengambil data iklan:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="py-5 text-center" style={{ backgroundColor: "#f8f9fa" }}>
      <h2 className="fw-bold mb-5" style={{fontSize:'42px'}}>Beberapa Daftar Gudang</h2>
      
      <div className="container">
        <div className="row justify-content-center g-4">
          {iklan.length > 0 ? (
            iklan.map((item) => (
              <div key={item.id} className="col-12 col-sm-6 col-md-3 d-flex">
                <div className="card shadow-sm border-0 h-100 w-100">
                  
                  <div 
                    className="position-relative" 
                    style={{ 
                      aspectRatio: '16/9',
                      backgroundColor: '#e9ecef',
                      borderTopLeftRadius: '0.375rem',
                      borderTopRightRadius: '0.375rem',
                      overflow: 'hidden'
                    }}
                  >
                    <img
                      src={
                       item.gambar_1 ? `http://localhost:3001/uploads/${item.gambar_1.replace("uploads/", "")}`
                        : "No Image"
                        }
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                        alt={item.nama}
                    />
                    
                  </div>

                  <div className="card-body text-start d-flex flex-column p-3">
                    <h5 className="fw-semibold mb-2" style={{fontSize:'16px'}}>{item.nama_gudang}</h5>
                    
                    <div className="small mb-3">
                      <p className="mb-1 text-muted" style={{fontSize:'14px'}}>Lokasi : <span className="text-dark" style={{fontSize:'12px'}}>{item.lokasi || "-"}</span></p>
                      <p className="mb-1 text-muted" style={{fontSize:'14px'}}>Harga : <span className="text-dark" style={{fontSize:'12px'}}>Rp {Number(item.harga).toLocaleString("id-ID")}{item.per}</span></p>
                      <p className="mb-2 text-muted" style={{ fontSize:'14px' }}>
                        Status :{" "}
                        <span 
                          className="fw-medium" 
                          style={{ 
                            color: item.status === "Tersedia" ? "green" : item.status === "Terisi" ? "red" : "black" 
                          }}
                        >
                          {item.status || "-"}
                        </span>
                      </p>

                    </div>
                    
                    <div className="d-grid mt-auto">
                      <a 
                        href="/login"
                        className="btn btn-primary btn-sm" style={{fontSize:'14px',
                          pointerEvents: item.status === "Terisi" ? "none" : "auto",
                          opacity: item.status === "Terisi" ? 0.6 : 1
                        }}
                        
                      >
                        Lihat Detail
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted mt-3">Belum ada iklan gudang tersedia.</p>
          )}
        </div>
      </div>
    </section>
  );
}