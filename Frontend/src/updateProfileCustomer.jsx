import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HeartFill, Person, BoxArrowRight, PersonFill } from "react-bootstrap-icons";
import logoTempoBox from "./assets/Logo.svg";

const UpdateProfileCustomer = () => {
  const [user, setUser] = useState(null);
  const [filePhoto, setFilePhoto] = useState(null);
  const [removePhoto, setRemovePhoto] = useState(false);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    currentPhotoPreview: null,
  });

  const fileInputRef = useRef(null);

  // LOAD USER DARI LOCALSTORAGE
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);

      setFormState({
        name: parsed.name,
        email: parsed.email,
        phone: parsed.phone,
        password: "",
        currentPhotoPreview: null,
      });
    }
  }, []);

  // FOTO NAVBAR
  const getNavbarPhotoUrl = () => {
    if (!user?.photo_profil) return null;
    return user.photo_profil.startsWith("http")
      ? user.photo_profil
      : `http://localhost:3001/uploads/${user.photo_profil}`;
  };

  // FOTO PREVIEW FORM
  const getFormPhotoUrl = () => {
    if (formState.currentPhotoPreview) return formState.currentPhotoPreview;

    if (user?.photo_profil && !removePhoto) {
      return user.photo_profil.startsWith("http")
        ? user.photo_profil
        : `http://localhost:3001/uploads/${user.photo_profil}`;
    }

    return null;
  };

  const isPlaceholder = !getFormPhotoUrl();

  // INPUT HANDLER
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // BUTTON UPLOAD FOTO
  const handleUploadButtonClick = () => fileInputRef.current.click();

  // KETIKA FILE DIPILIH
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFilePhoto(file);
    setRemovePhoto(false);

    setFormState((prev) => ({
      ...prev,
      currentPhotoPreview: URL.createObjectURL(file),
    }));

    alert("Foto dipilih! Klik 'Simpan Data' untuk upload.");
  };

  // HAPUS FOTO PROFIL
  const handleDeletePhoto = () => {
    if (!window.confirm("Yakin ingin menghapus foto profil?")) return;

    setFilePhoto(null);
    setRemovePhoto(true);

    setFormState((prev) => ({
      ...prev,
      currentPhotoPreview: null,
    }));

    alert("Foto akan dihapus setelah klik 'Simpan Data'.");
  };

  // FETCH USER BARU SETELAH UPDATE
  const fetchUpdatedUser = async (id) => {
    const res = await fetch(`http://localhost:3001/users/${id}`);
    return await res.json();
  };

  // SIMPAN DATA
  const handleSaveData = async (e) => {
    e.preventDefault();
    if (!user) return alert("User tidak ditemukan!");

    const form = new FormData();
    form.append("name", formState.name);
    form.append("email", formState.email);
    form.append("phone", formState.phone);

    if (formState.password.trim() !== "") {
      form.append("password", formState.password);
    }

    // JIKA UPLOAD FOTO BARU
    if (filePhoto) {
      form.append("photo_profil", filePhoto);
      form.append("removePhoto", "true");
    }

    // JIKA HAPUS FOTO TANPA UPLOAD BARU
    if (removePhoto && !filePhoto) {
      form.append("removePhoto", "true");
    }

    try {
      const response = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PUT",
        body: form,
      });

      if (!response.ok) {
        const err = await response.json();
        return alert(err.message || "Gagal update profile");
      }

      const updatedUser = await fetchUpdatedUser(user.id);

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      alert("Profile berhasil diperbarui!");
      window.location.href = "/profile_customer";

    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat update profile.");
    }
  };

  const handleBatal = () => {
    window.location.href = "/profile_customer";
  };

  const handleLogout = () => {
    if (window.confirm("Yakin ingin keluar?")) {
      localStorage.removeItem("user");
      window.location.href = "/beranda";
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: "#F8F9FA" }}>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-2">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold text-primary ms-4" href="/dashboard_customer">
            <img src={logoTempoBox} alt="TempoBox" style={{ height: "32px" }} />
          </a>

          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item me-4">
                <a className="nav-link text-muted" href="/dashboard_customer">Beranda</a>
              </li>

              <li className="nav-item me-4">
                <a className="nav-link text-muted" href="/favorite_customer">
                  <HeartFill size={16} className="me-1" /> Gudang Favorite
                </a>
              </li>

              <li className="nav-item dropdown me-4">
                <a className="nav-link dropdown-toggle d-flex align-items-center p-0" href="#" data-bs-toggle="dropdown">
                  {getNavbarPhotoUrl() ? (
                    <img
                      src={getNavbarPhotoUrl()}
                      alt="avatar"
                      className="rounded-circle me-2"
                      style={{ width: "35px", height: "35px", objectFit: "cover" }}
                    />
                  ) : (
                    <i className="bi bi-person-circle fs-2 me-2 text-secondary"></i>
                  )}
                </a>

                <ul className="dropdown-menu dropdown-menu-end p-2 shadow-lg">
                  <li>
                    <a className="dropdown-item py-2" href="/profile_customer">
                      Profile
                    </a>
                  </li>
                  <li>
                    <button className="dropdown-item bg-danger text-white mt-1" onClick={handleLogout}>
                      <BoxArrowRight size={16} className="me-2" /> Keluar
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* MAIN FORM */}
      <main className="flex-grow-1 p-4 d-flex justify-content-center">
        <div className="mt-4" style={{ maxWidth: "800px", width: "100%" }}>
          <form onSubmit={handleSaveData} className="bg-white p-5 rounded-3 shadow-sm border">
            <div className="d-flex flex-wrap">

              {/* FOTO */}
              <div className="me-5 mb-4 text-center" style={{ width: "180px" }}>
                <div
                  className="mb-3 d-flex justify-content-center align-items-center rounded-3"
                  style={{
                    width: "150px",
                    height: "200px",
                    backgroundColor: isPlaceholder ? "#e9ecef" : "transparent",
                    border: isPlaceholder ? "1px solid #ced4da" : "none",
                    overflow: "hidden",
                  }}
                >
                  {isPlaceholder ? (
                    <PersonFill size={80} className="text-muted" />
                  ) : (
                    <img
                      src={getFormPhotoUrl()}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      alt="profil"
                    />
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  accept="image/*"
                />

                <button type="button" className="btn btn-primary w-100 mb-2 py-2" onClick={handleUploadButtonClick}>
                  Upload Foto
                </button>

                <button
                  type="button"
                  className="btn btn-danger w-100 py-2"
                  disabled={isPlaceholder}
                  onClick={handleDeletePhoto}
                >
                  Hapus Foto
                </button>
              </div>

              {/* INPUT FORM */}
              <div className="flex-grow-1">
                <div className="mb-3">
                  <label className="form-label text-muted small">Nama Lengkap</label>
                  <input type="text" className="form-control" name="name" value={formState.name} onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted small">Email</label>
                  <input type="email" className="form-control" name="email" value={formState.email} onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted small">No Telepon</label>
                  <input type="text" className="form-control" name="phone" value={formState.phone} onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted small">Password</label>
                  <input
                    type="text"
                    className="form-control"
                    name="password"
                    placeholder="Isi jika ingin mengganti password"
                    value={formState.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between gap-3 mt-4">
              <button type="button" className="btn btn-outline-danger flex-fill py-3" onClick={handleBatal}>
                Batal
              </button>

              <button type="submit" className="btn btn-primary flex-fill py-3">
                Simpan Data
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UpdateProfileCustomer;
