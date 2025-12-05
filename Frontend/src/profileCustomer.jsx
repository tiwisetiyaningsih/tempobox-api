import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HeartFill, Person, BoxArrowRight } from "react-bootstrap-icons"; 
import logoTempoBox from './assets/Logo.svg';

const ProfileCustomer = () => {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("user");

        if (stored) {
            setUserData(JSON.parse(stored));
        }
    }, []);

    const handleUpdateProfile = () => {
        const isConfirmed = window.confirm("Anda yakin ingin update profil?");
        if (isConfirmed) {
            window.location.href = "/update_profile_customer"; 
        }
    };

    const handleLogout = () => {
        const isConfirmed = window.confirm("Anda yakin ingin keluar?");
        if (isConfirmed) {
            localStorage.removeItem("user");
            window.location.href = "/beranda"; 
        }
    };

    // LOGIC SAJA, UI TIDAK DIUBAH
    const getPhotoUrl = () => {
        if (!userData?.photo_profil) return null;

        // Jika sudah berbentuk URL penuh
        if (userData.photo_profil.startsWith("http")) return userData.photo_profil;

        // Jika hanya nama file → generate URL
        return `http://localhost:3001/uploads/${userData.photo_profil}`;
    };

    return (
        <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#F8F9FA' }}>
            
            {/* NAVBAR */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-2">
                <div className="container-fluid">

                    {/* LOGO */}
                    <a className="navbar-brand fw-bold text-primary ms-4" href="/dashboard_customer">
                        <img src={logoTempoBox} alt="TempoBox logo" style={{ height: '32px' }} />
                    </a>

                    {/* MENU KANAN */}
                    <div className="collapse navbar-collapse justify-content-end">
                        <ul className="navbar-nav align-items-center">

                            <li className="nav-item me-4">
                                <a className="nav-link text-decoration-none text-muted" href="/dashboard_customer">
                                    Beranda
                                </a>
                            </li>

                            <li className="nav-item me-4">
                                <a className="nav-link text-decoration-none text-muted" href="/favorite_customer">
                                    <HeartFill className="me-1 text-muted" size={16} /> Gudang Favorite
                                </a>
                            </li>

                            {/* PROFILE DROPDOWN */}
                            <li className="nav-item dropdown me-4">
                                <a className="nav-link dropdown-toggle d-flex align-items-center p-0" href="#" data-bs-toggle="dropdown">

                                    {/* FOTO PROFIL (TIDAK UBAH UI, HANYA LOGIC) */}
                                    {getPhotoUrl() ? (
                                        <img
                                            src={getPhotoUrl()}
                                            alt="User Avatar"
                                            className="rounded-circle me-2"
                                            style={{ width: '35px', height: '35px', objectFit: "cover" }}
                                        />
                                    ) : (
                                        <i className="bi bi-person-circle fs-2 me-2 text-secondary"></i>
                                    )}

                                </a>

                                <ul className="dropdown-menu dropdown-menu-end p-2 shadow-lg">

                                    <li>
                                        <a className="dropdown-item py-2 rounded" href="/profile_customer">
                                            <Person size={16} className="me-2 text-secondary" /> Profile
                                        </a>
                                    </li>

                                    <li>
                                        <button 
                                            className="dropdown-item py-2 rounded text-white bg-danger mt-1 fw-medium"
                                            onClick={handleLogout}
                                        >
                                            <BoxArrowRight size={16} className="me-2" /> Keluar
                                        </button>
                                    </li>

                                </ul>
                            </li>

                        </ul>
                    </div>

                </div>
            </nav>

            {/* MAIN CONTENT */}
            <main className="flex-grow-1 p-4 d-flex justify-content-center">
                <div className="mt-4" style={{ maxWidth: '800px', width: '100%' }}>

                    <h2 className="fw-medium text-dark mb-4 ms-2" style={{ fontSize: '24px' }}>
                        Detail Profile
                    </h2>

                    {/* KOTAK INFORMASI PROFILE */}
                    <div className="bg-white p-4 rounded-3 border">

                        <div className="d-flex align-items-start">
                            <div className="align-self-stretch bg-light">

                            {/* FOTO PROFIL BESAR */}
                            {getPhotoUrl() ? (
                                <img 
                                    src={getPhotoUrl()}
                                    alt="Profile Picture" 
                                    className="rounded-3 me-0"
                                    style={{ width: '120px', height: '160px', objectFit: 'cover' }}
                                />
                            ) : (
                                <div 
                                    className="d-flex justify-content-center align-items-center rounded-3 me-2"
                                    style={{
                                        width: "120px",
                                        height: "160px",
                                        backgroundColor: "#f8f9fa"
                                    }}
                                >
                                    <i
                                        className="bi bi-person-fill-add text-black-50"
                                        style={{ fontSize: "50px" }}
                                    ></i>
                                </div>

                            )}
                            </div>

                            {/* DETAIL TEXT */}
                            <div className="d-flex flex-column justify-content-start pt-1 ps-3" style={{ fontSize: '16px' }}>

                                <div className="mb-2">
                                    <span className="text-muted d-block small">Nama Lengkap</span>
                                    <span className="fw-semibold text-dark">{userData?.name || "-"}</span>
                                </div>

                                <div className="mb-2">
                                    <span className="text-muted d-block small">Email</span>
                                    <span className="fw-semibold text-dark">{userData?.email || "-"}</span>
                                </div>

                                <div className="mb-2">
                                    <span className="text-muted d-block small">No Telepon</span>
                                    <span className="fw-semibold text-dark">{userData?.phone || "-"}</span>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* TOMBOL EDIT */}
                    <button 
                        className="btn btn-primary w-100 fw-medium mt-4 py-3"
                        style={{ fontSize: '18px' }}
                        onClick={handleUpdateProfile}
                    >
                        Ubah Data
                    </button>

                </div>
            </main>
        </div>
    );
};

export default ProfileCustomer;
