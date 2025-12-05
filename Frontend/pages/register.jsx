import { useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Kata Sandi dan Konfirmasi Kata Sandi tidak cocok!");
      return;
    }

    try {
      // 🔥 BAGIAN FETCH SUDAH DIBENERIN
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName,      
          email: form.email,
          phone: form.phone,
          password: form.password,
          role: 'user',
        }),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Register error:", err);
      alert("Terjadi kesalahan saat pendaftaran.");
    }
  };

  return (
    <div className="d-flex vh-100 login-page-split">
      <div className="col-lg-5 col-md-5 d-none d-md-flex flex-column justify-content-center p-5 text-white login-left-col">
        <h4 className="fw-light fst-italic ms-5">
          "Solusi menemukan gudang terpercaya"
        </h4>
      </div>

      <div className="col-12 col-md-7 d-flex flex-column justify-content-start align-items-start p-4 p-md-3 login-right-col">
        <div className="login-form-container ms-5" style={{ width: '100%', maxWidth: '80%' }}>

          <div className="mb-3">
            <Link
              to="/beranda"
              className="d-flex align-items-center gap-2 mb-3 fw-semibold text-decoration-none text-muted"
            >
              <i className="bi bi-chevron-left"></i>
              Kembali ke Beranda
            </Link>

            <div className="justify-content-center">
              <h3 className="fw-bold text-primary mb-1 mt-2 text-center">
                Daftar Akun TempoBox
              </h3>
              <p className="text-muted text-center">
                Silahkan isi data diri Anda untuk masuk ke Tempobox dan mulai mengelola gudang atau menyimpan daftar favorit.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label htmlFor="fullName" className="form-label fw-medium">
                Nama Lengkap
              </label>
              <input
                type="text"
                className="form-control border border-secondary"
                name="fullName"
                placeholder="Masukkan nama lengkap"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-medium">
                Email
              </label>
              <input
                type="email"
                className="form-control border border-secondary"
                name="email"
                placeholder="Masukkan email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label fw-medium">
                No Telepon
              </label>
              <input
                type="tel"
                className="form-control border border-secondary"
                name="phone"
                placeholder="Masukkan nomor telepon"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-medium">Kata Sandi</label>
              <div className="input-group border border-secondary rounded">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  name="password"
                  placeholder="Masukkan kata sandi"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  className="btn btn-white border-white"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
                </button>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-medium">Konfirmasi Kata Sandi</label>
              <div className="input-group border border-secondary rounded">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  name="confirmPassword"
                  placeholder="Masukkan konfirmasi kata sandi"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  className="btn btn-white border-white"
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <i className={`bi ${showConfirmPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 fw-medium mt-4"
            >
              Daftar
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-primary fw-semibold text-decoration-none">
              Masuk
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;
