import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HeartFill, Search, Person, BoxArrowRight } from "react-bootstrap-icons"; 
import logoTempoBox from './assets/Logo.svg';
import gudang1 from './assets/gudang.svg'; 
import profil_user from './assets/profil_user.svg';

const FavoriteCustomer = () => {

    const [favoriteGudang, setFavoriteGudang] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [userData, setUserData] = useState(null);

    // ================================
    // LOAD USER + FAVORITE SAAT AWAL
    // ================================
    useEffect(() => {
        const stored = localStorage.getItem("user") || localStorage.getItem("userData");

        if (stored) {
            const user = JSON.parse(stored);
            setUserData(user);
            loadFavoriteGudang(user.id);
        }
    }, []);

    // ================================
    // FUNGSI LOAD FAVORITE
    // ================================
    const loadFavoriteGudang = async (id_user) => {
        try {
            // Ambil daftar favorite user → hanya ID gudang
            const favRes = await fetch(`http://localhost:3001/favorite/${id_user}`);
            const favData = await favRes.json();  
            // hasil: [ { id_gudang }, { id_gudang } ]

            const gudangIds = favData.map(item => Number(item.id_gudang));

            if (gudangIds.length === 0) {
                setFavoriteGudang([]);
                return;
            }

            // Ambil semua gudang
            const gudangRes = await fetch(`http://localhost:3001/gudang`);
            const allGudang = await gudangRes.json();

            // Filter gudang yang ada di favorite
            const filtered = allGudang.filter(g => 
                gudangIds.includes(Number(g.id))
            );

            setFavoriteGudang(filtered);

        } catch (error) {
            console.error("ERROR LOADING FAVORITE:", error);
        }
    };

    // =======================================
    // HAPUS FAVORITE (DELETE)
    // =======================================
    const handleRemoveFavorite = async (gudangId) => {
        if (!userData) return;

        const confirmDelete = window.confirm("Hapus dari gudang favorite?");
        if (!confirmDelete) return;

        try {
            await fetch(`http://localhost:3001/favorite/${userData.id}/${gudangId}`, {
                method: "DELETE",
            });

            // Update UI
            setFavoriteGudang(favoriteGudang.filter(g => g.id !== gudangId));

        } catch (error) {
            console.error("ERROR REMOVE FAVORITE:", error);
        }
    };

    // =======================================
    // LOGOUT
    // =======================================
    const handleLogout = () => {
        const isConfirmed = window.confirm("Anda yakin ingin keluar?");
        if (isConfirmed) {
            window.location.href = "/beranda"; 
        } 
    };

    // =======================================
    // FILTER SEARCH
    // =======================================
    const filteredGudang = favoriteGudang.filter(g =>
        g.nama.toLowerCase().includes(searchText.toLowerCase())
    );

    // =======================================
    // LIHAT DETAIL
    // =======================================
    const handleLihatDetail = (gudangId) => {
        window.location.href = `/detail_gudang/${gudangId}`; 
    };


    return (
        <div className="d-flex flex-column min-vh-100 bg-light">

            {/* NAVBAR / HEADER */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-2">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold text-primary ms-4" href="/dashboard_customer">
                        <img src={logoTempoBox} className="logoTempoBox" alt="TempoBox logo" style={{ height: '32px' }} />
                    </a>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav align-items-center">
                            <li className="nav-item me-4">
                                <a className="nav-link text-decoration-none text-muted" href="/dashboard_customer">Beranda</a>
                            </li>
                            <li className="nav-item me-4">
                                <a className="nav-link text-decoration-none text-primary fw-semibold" href="/favorite_customer">
                                    <HeartFill className="me-1 text-primary" size={16} /> Gudang Favorite
                                </a>
                            </li>

                            <li className="nav-item dropdown me-4">
                                <a className="nav-link dropdown-toggle d-flex align-items-center p-0" href="#" data-bs-toggle="dropdown">
                                    {userData?.photo_profil ? (
                                        <img src={userData.photo_profil}
                                             alt="User Avatar"
                                             className="rounded-circle me-2"
                                             style={{ width: '35px', height: '35px', objectFit: "cover" }} />
                                    ) : (
                                        <i className="bi bi-person-circle fs-2 me-2 text-secondary"></i>
                                    )}
                                </a>

                                <ul className="dropdown-menu dropdown-menu-end p-2 shadow-lg" aria-labelledby="navbarDropdown" style={{ border: 'none' }}>
                                    <li>
                                        <a className="dropdown-item py-2 rounded" href="/profile_customer">
                                            <Person size={16} className="me-2 text-secondary" /> Profile
                                        </a>
                                    </li>
                                    <li>
                                        <button className="dropdown-item py-2 rounded text-white bg-danger mt-1 fw-medium"
                                            onClick={handleLogout}>
                                            <BoxArrowRight size={16} className="me-2" /> Keluar
                                        </button>
                                    </li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

            {/* MAIN */}
            <main className="flex-grow-1 p-4 d-flex flex-column align-items-center justify-content-start">

                <div className="text-center my-3">
                    <h1 className="fw-bold text-dark mb-2" style={{fontSize:'32px'}}>Gudang Favorite Kamu</h1>
                    <p className="text-secondary fs-5" style={{fontSize:'20px'}}>
                        Favoritmu, Prioritasmu. Gudang yang sudah kamu simpan tampil di sini untuk akses cepat
                    </p>
                </div>

                {/* SEARCH */}
                <div className="input-group mb-5" style={{ maxWidth: '700px', width: '100%' }}>
                    <span className="input-group-text bg-white border-end-0 pe-0 rounded-start-pill border py-2">
                        <Search className="text-muted ms-3" size={20} />
                    </span>
                    <input
                        type="text"
                        className="form-control border-start-0 ps-2 rounded-end-pill py-2 "
                        placeholder="Cari Favorite"
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ height: '50px' }}
                    />
                </div>


                {/* GRID KARTU GUDANG */}
                <div className="container-fluid">
                    {filteredGudang.length > 0 ? (
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-5">

                            {filteredGudang.map((gudang) => (
                                <div className="col" key={gudang.id}>
                                    <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">

                                        <div className="position-relative">
                                           <img
                                                src={
                                                    gudang.gambar_1
                                                    ? `http://localhost:3001/uploads/${gudang.gambar_1.replace("uploads/", "")}`
                                                    : "No Image"
                                                }
                                                className="card-img-top"
                                                style={{ height: "200px", objectFit: "cover" }}
                                                alt={gudang.nama}
                                            />

                                            <button
                                                className="btn btn-light rounded-circle p-1.5 position-absolute top-0 end-0 m-3 shadow-sm"
                                                onClick={() => handleRemoveFavorite(gudang.id)}
                                            >
                                                <HeartFill
                                                    size={16}
                                                    className="text-danger"
                                                />
                                            </button>
                                        </div>

                                        <div className="card-body p-3">
                                            <h5 className="card-title fw-semibold">{gudang.nama}</h5>

                                            <p className="text-muted small mb-1">
                                                Lokasi: {gudang.lokasi}
                                            </p>

                                            <p className="text-muted small mb-1">
                                                Harga: Rp {Number(gudang.harga).toLocaleString("id-ID")}{gudang.per}
                                            </p>

                                            <p className="text-muted small mb-3">
                                                Status:
                                                <span className={`fw-medium ${gudang.status === "Tersedia" ? "text-success" : "text-danger"}`}>
                                                    {" " + gudang.status}
                                                </span>
                                            </p>

                                            <button
                                                className="btn btn-primary w-100 fw-medium"
                                                onClick={() => handleLihatDetail(gudang.id)}
                                                disabled={gudang.status === "Terisi" || gudang.status === "Penuh"}
                                            >
                                                Lihat Detail
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            ))}

                        </div>
                    ) : (
                        <div className="text-center mt-5">
                            <h4 className="text-muted">Anda belum menambahkan gudang ke favorit.</h4>
                            <p className="text-secondary">Cari gudang di halaman Beranda dan tekan ikon hati untuk menyimpannya di sini.</p>
                        </div>
                    )}
                </div>
            </main>

        </div>
    );
};

export default FavoriteCustomer;
