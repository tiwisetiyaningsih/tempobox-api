-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 05, 2025 at 08:24 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tempobox`
--

-- --------------------------------------------------------

--
-- Table structure for table `favorite`
--

CREATE TABLE `favorite` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_gudang` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `favorite`
--

INSERT INTO `favorite` (`id`, `id_user`, `id_gudang`, `created_at`, `updated_at`) VALUES
(3, 2, 2, '2025-11-29 18:13:18', '2025-11-29 18:13:18'),
(4, 2, 1, '2025-11-29 18:13:19', '2025-11-29 18:13:19'),
(6, 17, 15, '2025-12-03 21:51:20', '2025-12-03 21:51:20'),
(7, 17, 9, '2025-12-03 21:51:25', '2025-12-03 21:51:25'),
(8, 17, 4, '2025-12-03 21:51:30', '2025-12-03 21:51:30'),
(9, 17, 3, '2025-12-03 21:51:31', '2025-12-03 21:51:31'),
(10, 19, 15, '2025-12-03 22:05:09', '2025-12-03 22:05:09'),
(11, 19, 8, '2025-12-03 22:05:13', '2025-12-03 22:05:13'),
(12, 19, 4, '2025-12-03 22:05:16', '2025-12-03 22:05:16'),
(15, 2, 14, '2025-12-05 14:58:38', '2025-12-05 14:58:38');

-- --------------------------------------------------------

--
-- Table structure for table `gudang`
--

CREATE TABLE `gudang` (
  `id` int(11) NOT NULL,
  `gambar_1` varchar(255) DEFAULT NULL,
  `gambar_2` varchar(255) DEFAULT NULL,
  `gambar_3` varchar(255) DEFAULT NULL,
  `nama` varchar(150) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `lokasi` varchar(255) DEFAULT NULL,
  `harga` decimal(15,2) DEFAULT NULL,
  `per` varchar(50) DEFAULT NULL,
  `luas` varchar(50) DEFAULT NULL,
  `fasilitas` text DEFAULT NULL,
  `status` enum('Tersedia','Terisi') DEFAULT 'Tersedia',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gudang`
--

INSERT INTO `gudang` (`id`, `gambar_1`, `gambar_2`, `gambar_3`, `nama`, `deskripsi`, `lokasi`, `harga`, `per`, `luas`, `fasilitas`, `status`, `created_at`, `updated_at`) VALUES
(1, '1764797375441-174453438.jpg', '1764797375460-8644557.jpg', '1764797375466-377585567.jpg', 'Gudang Penyimpanan Timur', 'Gudang cocok untuk penyimpanan barang industri skala menengah.', 'Jakarta Timur', '5000000.00', '/bulan', '200 m2', 'CCTV, Akses forklift, Ventilasi bagus, Keamanan 24 jam', 'Tersedia', '2025-11-26 18:49:26', '2025-12-03 21:29:35'),
(2, '1764797350578-433380014.jpg', '1764797350578-307591122.jpeg', '1764797350583-889232965.jpg', 'Gudang Distribusi Selatan', 'Gudang dekat akses tol, cocok untuk distribusi cepat.', 'Bekasi', '65000000.00', '/tahun', '250 m2', 'Akses truk besar, Area parkir luas, CCTV, Kebersihan terjaga', 'Terisi', '2025-11-26 18:49:26', '2025-12-03 21:29:10'),
(3, '1764797245091-287093234.jpeg', '1764797245098-94375597.jpg', '1764797245108-471771498.jpeg', 'Gudang Penyimpanan Barat', 'Gudang dengan fasilitas lengkap dan lokasi strategis.', 'Bandung Barat', '450000.00', '/hari', '180 m2', 'Keamanan 24 jam, Air bersih, Akses mobil mudah', 'Tersedia', '2025-11-26 18:49:26', '2025-12-03 21:27:25'),
(4, '1764797214088-336573732.jpg', '1764797214088-390182608.jpeg', '1764797214091-699674311.jpg', 'Gudang Penyimpanan Utara', 'Gudang ideal untuk penyimpanan jangka panjang, berlokasi di dekat pelabuhan.', 'Semarang', '6000000.00', '/bulan', '250 m2', 'Akses mudah truk trailer, Keamanan 24 jam, CCTV', 'Tersedia', '2025-11-30 19:23:25', '2025-12-03 21:26:54'),
(6, '1764797176999-958182742.jpg', '1764797177000-542460818.jpg', '1764797177002-777143446.jpeg', 'Gudang Dingin Agro', 'Fasilitas cold storage modern, khusus untuk produk pertanian dan makanan beku.', 'Malang', '1500000.00', '/hari', '50 m2', 'Suhu terkontrol, Genset cadangan, Forklift', 'Tersedia', '2025-11-30 19:23:25', '2025-12-03 21:26:17'),
(7, '1764797093703-735053154.jpg', '1764797093710-792282429.jpg', '1764797093710-339040175.jpg', 'Gudang Industri Berat', 'Gudang dengan daya listrik besar dan lantai kuat untuk mesin-mesin industri berat.', 'Cikarang', '120000000.00', '/tahun', '500 m2', 'Dermaga loading dock, Jaringan listrik 3 phase, Keamanan', 'Tersedia', '2025-11-30 19:23:25', '2025-12-03 21:24:53'),
(8, '1764796940206-999754119.jpg', '1764796940207-718144658.jpg', '1764796940214-811643545.jpg', 'Mini Warehouse Retail', 'Unit gudang kecil untuk UMKM atau penyimpanan stok e-commerce skala kecil.', 'Jakarta Pusat', '2000000.00', '/bulan', '20 m2', 'Akses pribadi, AC, Dekat pusat perbelanjaan', 'Tersedia', '2025-11-30 19:23:25', '2025-12-03 21:22:20'),
(9, '1764796888684-242744489.jpg', '1764796888685-841354060.jpg', '1764796888688-306115228.jpg', 'Gudang Transit Pelabuhan', 'Berada di kawasan berikat, cocok untuk barang impor/ekspor yang cepat.', 'Surabaya', '9500000.00', '/bulan', '350 m2', 'Akses kontainer, Izin kawasan berikat, CCTV', 'Tersedia', '2025-11-30 19:23:25', '2025-12-03 21:21:28'),
(10, '1764796770282-883084594.jpg', '1764796770293-925909698.jpg', '1764796770296-560581744.jpg', 'Gudang Kosong Siap Pakai', 'Gudang standar tanpa sekat, siap digunakan untuk berbagai jenis barang.', 'Yogyakarta', '400000.00', '/hari', '150 m2', 'Air bersih, Toilet, Parkir karyawan', 'Tersedia', '2025-11-30 19:23:25', '2025-12-03 21:19:30'),
(11, '1764796727608-116169904.jpg', '1764796727610-74741206.jpg', '1764796727623-559699715.jpg', 'Gudang Arsip Dokumen', 'Fasilitas penyimpanan khusus untuk dokumen penting dengan pengendalian kelembaban.', 'Bandung', '3500000.00', '/bulan', '80 m2', 'Pengendalian suhu/kelembaban, Sistem rak khusus, Keamanan', 'Tersedia', '2025-11-30 19:23:25', '2025-12-03 21:18:47'),
(12, '1764796687815-486926471.jpg', '1764796687816-463247407.jpg', '1764796687819-639543731.jpg', 'Gudang Kimia Non-B3', 'Gudang dengan ventilasi baik untuk penyimpanan bahan kimia non-berbahaya.', 'Gresik', '10000000.00', '/bulan', '400 m2', 'Ventilasi kuat, Lantai tahan zat kimia, Izin khusus', 'Terisi', '2025-11-30 19:23:25', '2025-12-03 21:18:07'),
(14, '1764796665395-773545639.jpg', '1764796665403-859221974.jpg', '1764796665404-926702850.jpg', 'Gudang Penunjang Proyek', 'Gudang sementara cocok untuk menyimpan peralatan dan material proyek konstruksi.', 'Bogor', '150000.00', '/hari', '100 m2', 'Akses mobil mudah, Dekat lokasi konstruksi, Keamanan', 'Tersedia', '2025-11-30 19:23:25', '2025-12-03 21:17:45'),
(15, '1764796629613-299906904.jpeg', '1764796629617-667461352.jpg', '1764796629621-310712178.jpg', 'Gudang Penyimpanan Khusus', 'Gudang dengan keamanan ekstra untuk barang bernilai tinggi atau elektronik.', 'Jakarta Selatan', '5000000.00', '/bulan', '60 m2', 'Brankas, Alarm keamanan ganda, Asuransi', 'Tersedia', '2025-11-30 19:23:25', '2025-12-03 21:17:09');

-- --------------------------------------------------------

--
-- Table structure for table `iklan`
--

CREATE TABLE `iklan` (
  `id` int(11) NOT NULL,
  `id_admin` int(11) NOT NULL,
  `id_gudang` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `iklan`
--

INSERT INTO `iklan` (`id`, `id_admin`, `id_gudang`, `created_at`, `updated_at`) VALUES
(16, 1, 3, '2025-12-03 21:46:05', '2025-12-03 21:46:05'),
(18, 1, 6, '2025-12-03 21:47:01', '2025-12-03 21:47:01'),
(19, 1, 1, '2025-12-03 21:47:02', '2025-12-03 21:47:02'),
(20, 1, 8, '2025-12-03 21:47:09', '2025-12-03 21:47:09'),
(22, 1, 15, '2025-12-03 22:07:08', '2025-12-03 22:07:08'),
(23, 1, 12, '2025-12-03 22:07:10', '2025-12-03 22:07:10'),
(24, 1, 10, '2025-12-03 22:07:11', '2025-12-03 22:07:11');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'user',
  `photo_profil` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `role`, `photo_profil`, `created_at`) VALUES
(1, 'Tiwi Arum', 'tiwiarum@gmail.com', '081229349313', '$2b$10$GoPTjWMtx4pjekaUiNuhhOVAN1oqhZOnt2Odd.iN.cxfMn.7UmhhK', 'admin', 'http://localhost:3001/uploads/1764627060343.jpg', '2025-11-25 12:11:22'),
(2, 'Tifany Fadilah', 'tifany561@gmail.com', '08111122234', '$2b$10$z3JjdWrCe7EmIgY.9AV4XeVDBlkF/LnTICCpGpVJK1xldliTZ63nm', 'user', 'http://localhost:3001/uploads/1764795953830-106773895.jpg', '2025-11-25 12:28:32'),
(11, 'Rina Astuti', 'rina@gmail.com', '08987654321', '$2b$10$Zxq/pJzVjLvEA1KwKjvXmeUlTWwKOulivPiIXW4zNHzkJsshOgxvW', 'user', '1764624209574.jpeg', '2025-12-01 21:23:29'),
(12, 'Lestari Bunga', 'lestarib@gmail.com', '087855443322', '$2b$10$9oJ1z7IoHqpupSfOSkkHK.9Vjti9ksVmfgZ9H4PFv1PLFmLdicjDW', 'admin', '1764624751292.jpg', '2025-12-01 21:32:31'),
(13, 'Fitriani Jaya Abadi', 'fitriani@gmail.com', '085798765432', '$2b$10$FWN8CmNjnwCsPlZY6//ogOWOh1gdt9MIfYcUD0Y3/ogf7fsnRU3ya', 'user', 'http://localhost:3001/uploads/1764626632885.jpeg', '2025-12-01 21:37:25'),
(14, 'Sari Dewi', 'saridewi@gmail.com', '081212345678', '$2b$10$GWsr9fE36kA9hk9cgS9uoOvFuOQMCJdq2QhEwbPrE7xLMSV0tWLsm', 'user', 'http://localhost:3001/uploads/1764626798837.jpg', '2025-12-01 22:06:18'),
(15, 'Citra Amelia', 'citraa@gmail.com', '085544332211', '$2b$10$TkUt1Aw3usqJI4/rUl6SfOXA.Ry2jrsE0cKWHtSCcGQQFQ/mexZvS', 'user', '1764626982842.jpg', '2025-12-01 22:09:42'),
(16, 'Doni Pratama', 'donip15@gmail.com', '087788990011', '$2b$10$ZrFWNk1C3QK4bVEJs/j2zuU.2s5bXC.2Mp3gy/hO2jB8rHv6Atcv2', 'user', 'http://localhost:3001/uploads/1764794159047.jpg', '2025-12-01 22:17:44'),
(17, 'Tiwi Arum S', 'tiwisetiyaningsih@gmail.com', '081229349313', '$2b$10$Gm2u2s9r2lqykyCUDkR25emaSm5WnpSsrfH.1hWAkXbrWsIUTxeFG', 'user', 'http://localhost:3001/uploads/1764798782013-708201986.jpeg', '2025-12-03 21:50:37'),
(19, 'Dwi Fatima Azahra', 'dwifatma@gmail.com', '086390762892', '$2b$10$6DK65C85GVxAtbRlHTIrdOgT5E/HMlX7vhUKROCleZRB0tVXZc8L.', 'admin', 'http://localhost:3001/uploads/1764799595064-337544480.jpg', '2025-12-03 22:04:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_gudang` (`id_gudang`);

--
-- Indexes for table `gudang`
--
ALTER TABLE `gudang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `iklan`
--
ALTER TABLE `iklan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_admin` (`id_admin`),
  ADD KEY `id_gudang` (`id_gudang`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `favorite`
--
ALTER TABLE `favorite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `gudang`
--
ALTER TABLE `gudang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `iklan`
--
ALTER TABLE `iklan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favorite`
--
ALTER TABLE `favorite`
  ADD CONSTRAINT `favorite_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorite_ibfk_2` FOREIGN KEY (`id_gudang`) REFERENCES `gudang` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `iklan`
--
ALTER TABLE `iklan`
  ADD CONSTRAINT `iklan_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `iklan_ibfk_2` FOREIGN KEY (`id_gudang`) REFERENCES `gudang` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
