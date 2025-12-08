import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { HeartFill, Person, BoxArrowRight, ChevronLeft } from "react-bootstrap-icons";

const DetailGudang = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [gudangData, setGudangData] = useState(null);
    const [userData, setUserData] = useState(null); // data user login

    useEffect(() => {
        // Ambil data user dari localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUserData(JSON.parse(storedUser));

        // Fetch data gudang dari server
        const fetchGudang = async () => {
            try {
                const res = await fetch(`https://tempobox-api.up.railway.app/gudang/${id}`);
                const data = await res.json();

                const images = [];
                if (data.gambar_1) images.push(`https://tempobox-api.up.railway.app/uploads/${data.gambar_1}`);
                if (data.gambar_2) images.push(`https://tempobox-api.up.railway.app/uploads/${data.gambar_2}`);
                if (data.gambar_3) images.push(`https://tempobox-api.up.railway.app/uploads/${data.gambar_3}`);

                const details = [
                    { keterangan: "Lokasi", detail: data.lokasi },
                    { keterangan: "Luas", detail: data.luas + " m²" },
                    { keterangan: "Fasilitas", detail: data.fasilitas },
                    { keterangan: "Harga", detail: "Rp " + Number(data.harga).toLocaleString("id-ID") + (data.per)},
                    { keterangan: "Status", detail: data.status_gudang },
                ];

                setGudangData({
                    id: data.id,
                    name: data.nama,
                    description: data.deskripsi,
                    details,
                    images,
                });
            } catch (error) {
                console.error("Gagal ambil data gudang:", error);
            }
        };

        fetchGudang();
    }, [id]);

    const handleLogout = () => {
        if (window.confirm("Anda yakin ingin keluar?")) {
            navigate("/beranda");
        }
    };

    const handlePesan = () => {
        if (!gudangData || !userData) return;

        const phoneNumber = '6281225351055';
        // Ambil detail-detail gudang
        const gudangName = gudangData.name;
        const sizeDetail = gudangData.details.find(d => d.keterangan === 'Luas')?.detail || "Tidak Diketahui";
        const locationDetail = gudangData.details.find(d => d.keterangan === 'Lokasi')?.detail || "Tidak Diketahui";
        const priceRaw = gudangData.details.find(d => d.keterangan === 'Harga')?.detail || "";
        
        // Pisahkan harga & per
        let [priceOnly, perOnly] = priceRaw.replace("Rp ", "").split(" / ");
        priceOnly = "Rp " + priceOnly;       // hasil final harga
        perOnly = perOnly ? `/${perOnly}` : ""; // hasil final per

        const userName = userData.name || "Nama Pengguna"; 

        const messageTemplate =
        `Halo min %0A` +
        `Perkenalkan, saya *${userName}*.%0A%0A` +
        `Saya berminat untuk menyewa gudang berikut:%0A` +
        `• *Nama Gudang:* ${gudangName}%0A` +
        `• *Lokasi:* ${locationDetail}%0A` +
        `• *Luas:* ${sizeDetail}%0A` +
        `• *Harga:* ${priceOnly}${perOnly}%0A%0A` +
        `Mohon informasi lebih lanjut mengenai ketersediaan dan prosedur sewa gudang tersebut. Terima kasih.`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${messageTemplate}`;
        window.open(whatsappUrl, '_blank');
    };

    if (!gudangData) return <div className="text-center p-5">Loading...</div>;

    return (
        <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#F8F9FA' }}>
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-3">
                <div className="container-fluid ms-5">
                    <Link  to="/dashboard_customer" className="d-flex align-items-center text-decoration-none text-muted fw-medium">
                        <ChevronLeft size={20} className="me-1" /> Kembali ke Beranda
                    </Link>
                </div>
            </nav>

            <main className="flex-grow-1 p-4 d-flex justify-content-center">
                <div style={{ maxWidth: '1000px', width: '100%' }}>
                    {/* Carousel */}
                    <div id="gudangCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
                        <div className="carousel-inner rounded-3" style={{ height: '350px', backgroundColor: '#e9ecef' }}>
                            {gudangData.images.map((img, index) => (
                                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <img
                                        src={img}
                                        className="d-block w-100"
                                        alt={`Gambar ${index + 1}`}
                                        style={{ height: '350px', objectFit: 'cover' }}
                                    />
                                </div>
                            ))}
                        </div>
                        {gudangData.images.length > 1 && (
                            <>
                                <button className="carousel-control-prev" type="button" data-bs-target="#gudangCarousel" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#gudangCarousel" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </>
                        )}
                    </div>

                    <div className="bg-white p-4 rounded-3 shadow-sm border mb-4">
                        <h3 className="fw-bold mb-3">{gudangData.name}</h3>
                        <h4 className="fw-medium text-dark" style={{ fontSize: '18px' }}>Deskripsi</h4>
                        <p className="text-secondary">{gudangData.description}</p>
                    </div>

                    <div className="bg-white p-4 rounded-3 shadow-sm border mb-4">
                        <h4 className="fw-medium text-dark mb-3" style={{ fontSize: '18px' }}>Detail Informasi</h4>
                        <table className="table table-bordered mb-0">
                            <tbody>
                                <tr className="table-primary">
                                    <th className="bg-primary text-white" style={{ width: '30%' }}>Keterangan</th>
                                    <th className="bg-primary text-white">Detail</th>
                                </tr>
                                {gudangData.details.map((item, index) => (
                                    <tr key={index}>
                                        <td className="fw-medium">{item.keterangan}</td>
                                        <td>
                                            {item.keterangan === "Status" ? (
                                                item.detail === "Tersedia" ? (
                                                    <span className="text-success fw-bold">{item.detail}</span>
                                                ) : item.detail === "Terisi" ? (
                                                    <span className="text-danger fw-bold">{item.detail}</span>
                                                ) : (
                                                    item.detail
                                                )
                                            ) : (
                                                item.detail
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button
                        className="btn btn-primary w-100 fw-medium py-3 mb-2"
                        style={{ fontSize: "18px" }}
                        onClick={handlePesan}
                        disabled={
                            gudangData.details.find((d) => d.keterangan === "Status")?.detail !== "Tersedia"
                        }
                    >
                        {
                            gudangData.details.find((d) => d.keterangan === "Status")?.detail === "Tersedia"
                                ? "Pesan"
                                : "Gudang Sudah Terisi"
                        }
                    </button>
                </div>
            </main>
        </div>
    );
};

export default DetailGudang;
