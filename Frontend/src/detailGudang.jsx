import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
                const res = await fetch(`http://localhost:3001/gudang/${id}`);
                const data = await res.json();

                const images = [];
                if (data.gambar_1) images.push(`http://localhost:3001/uploads/${data.gambar_1}`);
                if (data.gambar_2) images.push(`http://localhost:3001/uploads/${data.gambar_2}`);
                if (data.gambar_3) images.push(`http://localhost:3001/uploads/${data.gambar_3}`);

                const details = [
                    { keterangan: "Lokasi", detail: data.lokasi },
                    { keterangan: "Luas", detail: data.luas },
                    { keterangan: "Fasilitas", detail: data.fasilitas },
                    { keterangan: "Status", detail: data.status },
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
        const gudangName = gudangData.name;
        const sizeDetail = gudangData.details.find(d => d.keterangan === 'Luas')?.detail || "Tidak Diketahui";
        const locationDetail = gudangData.details.find(d => d.keterangan === 'Lokasi')?.detail || "Tidak Diketahui";
        const userName = userData.name || "Nama Pengguna"; 

        const messageTemplate = 
            `Permisi ka\n` +
            `Saya ${userName} mau berminat untuk pesan gudang ${gudangName} ` +
            `dengan ukuran ${sizeDetail} ` +
            `yang berlokasi di ${locationDetail}`;

        const encodedMessage = encodeURIComponent(messageTemplate);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    if (!gudangData) return <div className="text-center p-5">Loading...</div>;

    return (
        <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#F8F9FA' }}>
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-3">
                <div className="container-fluid ms-5">
                    <a href="/dashboard_customer" className="d-flex align-items-center text-decoration-none text-muted fw-medium">
                        <ChevronLeft size={20} className="me-1" /> Kembali ke Beranda
                    </a>
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
                                            {item.keterangan === 'Status' && item.detail === 'Tersedia' ? (
                                                <span className="text-success fw-bold">{item.detail}</span>
                                            ) : item.detail}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button
                        className="btn btn-primary w-100 fw-medium py-3 mb-2"
                        style={{ fontSize: '18px' }}
                        onClick={handlePesan}
                    >
                        Pesan
                    </button>
                </div>
            </main>
        </div>
    );
};

export default DetailGudang;
