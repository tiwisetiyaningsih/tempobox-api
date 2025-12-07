import { useState } from 'react'
import React from 'react'
import './App.css'
import '../pages/login.css'
import '../pages/register.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from "../pages/register.jsx";
import Login from "../pages/login.jsx";
import Navbar from './navbar.jsx'
import Header from './header.jsx'
import Keunggulan from './keunggulan.jsx'
import DaftarGudang from './daftarGudang.jsx'
import CaraKerja from './caraKerja.jsx'
import TentangKami from './tentangKami.jsx'
import Footer from './footer.jsx';

import DashboardCustomer from "./dashboard_customer.jsx";
import FavoriteCustomer from './favoriteCustomer.jsx';
import ProfileCustomer from './profileCustomer.jsx';
import UpdateProfileCustomer from './updateProfileCustomer.jsx';
import DetailGudang from './detailGudang.jsx';

import DashboardAdmin from './dashboard_admin.jsx';
import KelolaGudang from './kelolaGudang.jsx';
import KelolaUsers from './kelolaUsers.jsx';
import AdminHome from './adminHome.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Halaman utama */}
          <Route
            path="/beranda"
            element={
              <div className="flex-column" style={{display: 'flex'}}>
                  <Navbar />
                 {/* Section Header */}
                  <section id="header">
                      <Header />
                  </section>

                  {/* Section Keunggulan kami */}
                  <section id="keunggulanKami">
                    <Keunggulan />
                  </section>

                  {/* Section Daftar Gudang */}
                  <section id="daftarGudang" className="pt-4">
                    <DaftarGudang />
                  </section>

                  {/* Section Cara Kerja */}
                  <section id="caraKerja" className="mb-5">
                    <CaraKerja />
                  </section>

                  {/* Section Tentang Kami */}
                  <section id="tentangKami">
                      <TentangKami />
                  </section>

                  {/* Section Kontak */}
                  <section id="footer">
                      <Footer />
                  </section>
              </div>
            }
          />
          {/* Halaman login dan register */}  
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* CUSTOMER */}
          <Route path="/dashboard_customer" element={<DashboardCustomer />} />
          <Route path="/favorite_customer" element={<FavoriteCustomer />} />
          <Route path="/profile_customer" element={<ProfileCustomer />} />
          <Route path='/update_profile_customer' element= {<UpdateProfileCustomer />} />
          <Route path='/detail_gudang/:id' element= {<DetailGudang />} />

          {/* ADMIN */}
          <Route path="/admin/dashboard" element={<DashboardAdmin />}>
            <Route index element={<AdminHome />} />
            <Route path="gudang" element={<KelolaGudang />} />
            <Route path="user" element={<KelolaUsers />} />
          </Route>
          
        </Routes>
      </Router>
    </>
  )
}

export default App
