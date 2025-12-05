import { useState, useEffect } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import './DashboardAdmin.css'; 
import logoTempoBox from './assets/Logo.svg';

function DashboardAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [adminInfo, setAdminInfo] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const userData = JSON.parse(storedUser);

      if (userData.role !== "admin") {
        navigate("/login");
        return;
      }

      setAdminInfo({
        name: userData.name,
        email: userData.email
      });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar?");
    if (!confirmLogout) return;

    localStorage.removeItem("user"); 
    navigate('/login');
  };

  // ✅ Highlight otomatis berdasarkan URL
  const isActive = (path) => location.pathname === path;

  return (
    <div className="d-flex admin-dashboard-container vh-100">

      {/* ===== SIDEBAR ===== */}
      <div className="sidebar bg-white border-end d-flex flex-column p-3">
        <div className="sidebar-header mb-4 text-start">
          <img src={logoTempoBox} className="logoTempoBox" alt="TempoBox logo"
               style={{ height: '35px', margin:'5px 0px' }} />
        </div>

        <nav className="nav flex-column flex-grow-1">
          <Link 
            to="/admin/dashboard" 
            className={`nav-link d-flex align-items-center gap-2 
              ${isActive('/admin/dashboard') ? 'active-menu' : ''}`}
          >
            <i className="bi bi-grid-fill"></i> Dashboard
          </Link>

          <Link 
            to="/admin/dashboard/gudang" 
            className={`nav-link d-flex align-items-center gap-2 
              ${isActive('/admin/dashboard/gudang') ? 'active-menu' : ''}`}
          >
            <i className="bi bi-archive-fill"></i> Kelola Gudang
          </Link>

          <Link 
            to="/admin/dashboard/user" 
            className={`nav-link d-flex align-items-center gap-2 
              ${isActive('/admin/dashboard/user') ? 'active-menu' : ''}`}
          >
            <i className="bi bi-people-fill"></i> Kelola User
          </Link>
        </nav>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="main-content flex-grow-1 d-flex flex-column">

        {/* ===== TOPBAR ===== */}
        <nav className="navbar navbar-light bg-white border-bottom p-3">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">Dashboard Admin</span>

            <div className="d-flex align-items-center">
              <div className="text-end me-3">
                <div className="small text-muted">{adminInfo.name}</div>
                <div className="fw-semibold">{adminInfo.email}</div>
              </div>

              <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1"></i> Keluar
              </button>
            </div>
          </div>
        </nav>

        {/* ✅ INI TEMPAT HALAMAN BERBEDA MUNCUL */}
        <div className="content-area p-4 flex-grow-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;