-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 14, 2026 at 03:29 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `motopartshub`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `CategoryId` int(11) NOT NULL,
  `CategoryName` varchar(100) NOT NULL,
  `Description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`CategoryId`, `CategoryName`, `Description`) VALUES
(1, 'Engine Parts', 'Engine-related motorcycle parts'),
(2, 'Suspension', 'Shock absorbers and suspension parts'),
(3, 'Electrical', 'Electrical and lighting parts'),
(4, 'Brakes', 'Brake system components'),
(5, 'Transmission', 'Drive train and chain components'),
(6, 'Fairings', 'Body panels and fairings'),
(7, 'Tires', 'Racing Tires Soft Compounds'),
(8, 'Helmet', 'Safety Gear');

-- --------------------------------------------------------

--
-- Table structure for table `inquiries`
--

CREATE TABLE `inquiries` (
  `InquiryId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `PartId` int(11) NOT NULL,
  `Message` varchar(500) NOT NULL,
  `Status` varchar(50) NOT NULL DEFAULT 'Pending',
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `AdminResponse` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inquiries`
--

INSERT INTO `inquiries` (`InquiryId`, `UserId`, `PartId`, `Message`, `Status`, `CreatedAt`, `AdminResponse`) VALUES
(3, 4, 3, 'Walang discount?', 'Responded', '2026-04-09 21:25:41', 'meron'),
(4, 4, 12, 'qweqwe', 'Responded', '2026-04-09 21:29:44', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `parts`
--

CREATE TABLE `parts` (
  `PartId` int(11) NOT NULL,
  `PartName` varchar(150) NOT NULL,
  `SKU` varchar(100) NOT NULL,
  `Brand` varchar(100) DEFAULT NULL,
  `CategoryId` int(11) NOT NULL,
  `ShopId` int(11) NOT NULL,
  `Price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `Stock` int(11) NOT NULL DEFAULT 0,
  `ShortDesc` varchar(255) DEFAULT NULL,
  `Compatibility` varchar(255) DEFAULT NULL,
  `Weight` decimal(10,2) DEFAULT NULL,
  `IsActive` tinyint(4) NOT NULL DEFAULT 1,
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `UpdatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parts`
--

INSERT INTO `parts` (`PartId`, `PartName`, `SKU`, `Brand`, `CategoryId`, `ShopId`, `Price`, `Stock`, `ShortDesc`, `Compatibility`, `Weight`, `IsActive`, `CreatedAt`, `UpdatedAt`) VALUES
(1, '5-Speed Gear Set', 'TRN-GST-063', 'Honda Genuine', 5, 1, 4100.00, 20, 'OEM 5-speed gear set for Honda XRM125.', 'Honda XRM125', 1.20, 1, '2026-04-09 20:53:25', '2026-04-09 20:53:25'),
(2, 'Adjustable Rear Shock', 'SUS-RSA-032', 'YSS', 2, 3, 3200.00, 20, 'Adjustable rear mono-shock.', NULL, NULL, 1, '2026-04-09 20:53:25', '2026-05-14 20:03:49'),
(3, 'CDI Unit', 'ELC-CDI-307', 'MotoZone', 3, 2, 950.00, 15, 'Unlocked CDI for higher-RPM performance.', 'Various underbone models', 0.20, 1, '2026-04-09 20:53:25', '2026-04-09 20:53:25'),
(4, 'Chain and Sprocket Kit', 'TRN-CSK-428', 'RiderHouse', 5, 3, 880.00, 22, 'Heavy-duty 428H chain and sprocket kit.', 'Raider / Sniper / XRM', 1.80, 1, '2026-04-09 20:53:25', '2026-04-09 20:53:25'),
(5, 'Disc Brake Pad Set', 'BRK-PDP-504', 'Brembo', 4, 4, 480.00, 18, 'Semi-metallic front disc brake pads.', 'Universal small bikes', 0.40, 1, '2026-04-09 20:53:25', '2026-04-09 20:53:25'),
(6, 'Fairing Side Panel Set', 'BDY-FSP-021', 'RiderHouse', 6, 3, 1200.00, 7, 'Left and right side fairing side panels.', 'Sport bike 150cc', 2.10, 1, '2026-04-09 20:53:25', '2026-04-09 20:53:25'),
(7, 'High-Performance Piston Kit', 'ENG-PKT-003', 'MotoZone', 1, 2, 2950.00, 2, 'Forged piston kit for 125cc.', NULL, NULL, 1, '2026-04-09 20:53:25', '2026-05-12 23:30:25'),
(8, 'LED Headlight Assembly H4', 'ELC-LED-H4', 'Philips Auto', 3, 5, 780.00, 111, 'Ultra-bright 6000K LED H4 headlight.', NULL, NULL, 1, '2026-04-09 20:53:25', '2026-05-12 23:41:23'),
(9, 'Tubeless Tire 70/80-17', 'TIR-TBL-070', 'IRC', 4, 1, 1358.00, 10, 'Tubeless front tire.', NULL, NULL, 1, '2026-04-09 20:53:25', '2026-05-12 23:41:35'),
(10, 'Valve Cover Gasket', 'ENG-VCG-019', 'Prublue', 1, 6, 120.00, 2, 'OEM-spec rubber valve cover gasket.', NULL, NULL, 1, '2026-04-09 20:53:25', '2026-05-14 20:04:09'),
(12, '342', '33322ee', '2123www', 1, 1, 12313.00, 0, 'wqweqwe', NULL, NULL, 0, '2026-04-09 21:20:14', '2026-05-12 20:49:18'),
(13, 'werwrwr', '324eew424', '324234', 1, 1, 1213123.00, 0, '23432424', NULL, NULL, 0, '2026-04-26 22:05:37', '2026-05-12 20:49:08'),
(14, 'SpiderMan', 'qwe-123', 'Hjc', 1, 1, 300000.00, 20, 'SafeTy Gear', NULL, NULL, 0, '2026-05-12 19:38:00', '2026-05-12 21:12:28'),
(15, 'Spider Man', 'SPM-123', 'HJC', 8, 7, 30000.00, 20, 'Safety Gear', NULL, NULL, 0, '2026-05-12 19:56:02', '2026-05-12 20:57:07'),
(16, 'Uma Pacer', 'UMA-001', 'Uma', 7, 7, 3000.00, 0, 'Grip Lock', NULL, NULL, 1, '2026-05-12 19:59:29', '2026-05-12 19:59:29'),
(17, 'Diablo Rosso', 'PIR-002', 'Pirelli', 7, 7, 5000.00, 30, 'GRIP', NULL, NULL, 0, '2026-05-12 20:00:48', '2026-05-12 23:41:05'),
(18, 'Pilot Stree 2', 'PIL-003', 'Michellin', 7, 7, 10000.00, 100, 'Wet And Dry Grip', NULL, NULL, 0, '2026-05-12 20:03:58', '2026-05-12 23:30:49'),
(19, 'Rossi', 'ROS-011', 'agv', 8, 6, 5000.00, 20, 'Safety Gear', NULL, NULL, 1, '2026-05-12 20:07:16', '2026-05-12 20:07:16'),
(20, 'doom', 'dom-213', 'KYT', 8, 7, 5000.00, 20, 'Safety', NULL, NULL, 0, '2026-05-12 20:21:49', '2026-05-12 23:31:17'),
(21, 'RCB MONOSHOCK', 'RCB-111', 'RacingBoy', 2, 6, 10000.00, 20, 'Suspension Racing', NULL, NULL, 0, '2026-05-12 20:24:11', '2026-05-12 23:31:53'),
(22, 'Monochock 208mm', 'Mon-000', 'MVR1', 2, 6, 4000.00, 10, 'Comfort', NULL, NULL, 0, '2026-05-12 20:46:17', '2026-05-12 20:49:34'),
(23, 'Sniper Fairings', 'SNI-223', 'Yamaha', 6, 2, 1000.00, 50, 'Fairings', NULL, NULL, 1, '2026-05-12 21:03:08', '2026-05-12 21:03:08'),
(24, 'q4q', '12313', 'q3q3', 7, 6, 3000.00, 20, '1313123', NULL, NULL, 0, '2026-05-12 21:21:24', '2026-05-12 23:31:46'),
(25, 'Throttle Body', 'THB-202', 'Uma', 1, 7, 5000.00, 10, NULL, NULL, NULL, 0, '2026-05-12 23:15:18', '2026-05-12 23:27:11'),
(26, 'Monoshock', 'RRR-223', 'RCB', 2, 7, 2000.00, 6, '213123', NULL, NULL, 0, '2026-05-12 23:16:24', '2026-05-12 23:31:43'),
(27, 'brembo', 'bre-232', 'brembo', 1, 5, 10000.00, 10, 'caliper', NULL, NULL, 0, '2026-05-12 23:25:18', '2026-05-12 23:31:36'),
(28, '3132', 'qwe-131', '132132', 2, 5, 11111.00, 20, NULL, NULL, NULL, 0, '2026-05-12 23:29:41', '2026-05-12 23:30:54'),
(29, '12313', '21312', '1231313', 6, 4, 123131.00, 13, NULL, NULL, NULL, 0, '2026-05-12 23:32:45', '2026-05-12 23:40:31'),
(30, 'caliper', 'sss-222', 'brembo', 4, 4, 10000.00, 123, '213123', NULL, NULL, 1, '2026-05-12 23:38:59', '2026-05-12 23:38:59'),
(31, 'luca', 'luc-222', 'KYT', 1, 7, 10000.00, 111, 'safety', NULL, NULL, 0, '2026-05-12 23:42:48', '2026-05-12 23:43:09'),
(32, 'rosso', 'ros-223', 'pirelli', 7, 7, 5000.00, 1231, NULL, NULL, NULL, 1, '2026-05-12 23:43:47', '2026-05-12 23:43:47'),
(33, 'Caliper', 'Cal-232', 'Brembo', 4, 5, 5000.00, 20, 'Brake', NULL, NULL, 1, '2026-05-13 08:47:48', '2026-05-13 08:47:48'),
(37, 'brakees', 'bre-231', 'rcb', 2, 5, 1000.00, 111, 'brake', NULL, NULL, 0, '2026-05-13 09:00:53', '2026-05-13 09:20:56'),
(38, 'brakesss', 'skk-223', 'rcb', 4, 5, 3000.00, 20, 'brakes', NULL, NULL, 0, '2026-05-13 09:21:37', '2026-05-14 20:02:32'),
(39, 'brakess', 'brk-222', 'rcb', 4, 5, 2000.00, 30000, '2131ww', NULL, NULL, 1, '2026-05-14 20:03:15', '2026-05-14 20:03:15');

-- --------------------------------------------------------

--
-- Table structure for table `part_features`
--

CREATE TABLE `part_features` (
  `FeatureId` int(11) NOT NULL,
  `PartId` int(11) NOT NULL,
  `FeatureText` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `part_features`
--

INSERT INTO `part_features` (`FeatureId`, `PartId`, `FeatureText`) VALUES
(1, 1, 'Genuine OEM'),
(2, 2, 'Adjustable damping'),
(3, 3, 'Unlocked performance CDI'),
(4, 4, 'Heavy-duty chain build'),
(5, 5, 'Durable semi-metallic compound'),
(6, 8, 'Ultra-bright illumination'),
(7, 9, 'Tubeless ready');

-- --------------------------------------------------------

--
-- Table structure for table `part_specs`
--

CREATE TABLE `part_specs` (
  `SpecId` int(11) NOT NULL,
  `PartId` int(11) NOT NULL,
  `SpecName` varchar(100) NOT NULL,
  `SpecValue` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `part_specs`
--

INSERT INTO `part_specs` (`SpecId`, `PartId`, `SpecName`, `SpecValue`) VALUES
(1, 1, 'Material', 'Hardened Steel'),
(2, 1, 'Compatibility Detail', 'Honda XRM125 engine'),
(3, 2, 'Size', '330mm'),
(4, 3, 'Voltage', '12V'),
(5, 7, 'Engine Type', '4-Stroke 125cc'),
(6, 8, 'Voltage', '12V DC');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `RoleId` int(11) NOT NULL,
  `RoleName` varchar(50) NOT NULL,
  `Description` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`RoleId`, `RoleName`, `Description`) VALUES
(1, 'Admin', 'System administrator'),
(2, 'User', 'Regular customer/user');

-- --------------------------------------------------------

--
-- Table structure for table `shops`
--

CREATE TABLE `shops` (
  `ShopId` int(11) NOT NULL,
  `ShopName` varchar(120) NOT NULL,
  `Location` varchar(150) DEFAULT NULL,
  `ContactNo` varchar(50) DEFAULT NULL,
  `IsActive` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shops`
--

INSERT INTO `shops` (`ShopId`, `ShopName`, `Location`, `ContactNo`, `IsActive`) VALUES
(1, 'OEM 5-Speed Gear', 'Quezon City', '09170000001', 1),
(2, 'MotoZone', 'Pasig City', '09170000002', 1),
(3, 'RiderHouse', 'Makati City', '09170000003', 1),
(4, 'Brembo Hub', 'Manila', '09170000004', 1),
(5, 'Philips Auto', 'Caloocan', '09170000005', 1),
(6, 'Prubluee', 'Taguig City', '09170000006', 1),
(7, 'SpeedGarage', 'Angono', '09159159195', 1);

-- --------------------------------------------------------

--
-- Table structure for table `stock_logs`
--

CREATE TABLE `stock_logs` (
  `LogId` int(11) NOT NULL,
  `PartId` int(11) NOT NULL,
  `ChangedBy` int(11) NOT NULL,
  `OldStock` int(11) NOT NULL,
  `NewStock` int(11) NOT NULL,
  `Reason` varchar(255) NOT NULL,
  `ChangedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock_logs`
--

INSERT INTO `stock_logs` (`LogId`, `PartId`, `ChangedBy`, `OldStock`, `NewStock`, `Reason`, `ChangedAt`) VALUES
(1, 1, 1, 0, 20, 'Initial stock on part creation', '2026-04-09 20:53:25'),
(2, 2, 1, 0, 3, 'Initial stock on part creation', '2026-04-09 20:53:25'),
(3, 3, 1, 0, 15, 'Initial stock on part creation', '2026-04-09 20:53:25'),
(4, 4, 1, 0, 22, 'Initial stock on part creation', '2026-04-09 20:53:25'),
(5, 5, 1, 0, 18, 'Initial stock on part creation', '2026-04-09 20:53:25'),
(6, 6, 1, 0, 7, 'Initial stock on part creation', '2026-04-09 20:53:25'),
(7, 7, 1, 0, 9, 'Initial stock on part creation', '2026-04-09 20:53:25'),
(8, 8, 1, 0, 25, 'Initial stock on part creation', '2026-04-09 20:53:25'),
(9, 9, 1, 0, 4, 'Initial stock on part creation', '2026-04-09 20:53:25'),
(10, 10, 1, 0, 3, 'Initial stock on part creation', '2026-04-09 20:53:25'),
(12, 12, 1, 0, 6, 'Initial stock on part creation', '2026-04-09 21:20:14'),
(13, 13, 1, 0, 7, 'Initial stock on part creation', '2026-04-26 22:05:37'),
(14, 10, 1, 3, 0, 'Stock updated via admin edit', '2026-04-26 22:05:52'),
(15, 12, 1, 6, 0, 'Stock updated via admin edit', '2026-05-12 19:36:14'),
(16, 13, 1, 7, 0, 'Stock updated via admin edit', '2026-05-12 19:36:38'),
(17, 14, 1, 0, 20, 'Initial stock on part creation', '2026-05-12 19:38:00'),
(18, 15, 1, 0, 20, 'Initial stock on part creation', '2026-05-12 19:56:02'),
(19, 17, 1, 0, 30, 'Initial stock on part creation', '2026-05-12 20:00:48'),
(20, 18, 1, 0, 100, 'Initial stock on part creation', '2026-05-12 20:03:58'),
(21, 19, 1, 0, 20, 'Initial stock on part creation', '2026-05-12 20:07:16'),
(22, 20, 1, 0, 20, 'Initial stock on part creation', '2026-05-12 20:21:49'),
(23, 21, 1, 0, 20, 'Initial stock on part creation', '2026-05-12 20:24:11'),
(24, 22, 1, 0, 10, 'Initial stock on part creation', '2026-05-12 20:46:17'),
(25, 23, 1, 0, 50, 'Initial stock on part creation', '2026-05-12 21:03:08'),
(26, 8, 1, 25, 0, 'Stock updated via admin edit', '2026-05-12 21:03:35'),
(27, 24, 1, 0, 20, 'Initial stock on part creation', '2026-05-12 21:21:24'),
(28, 25, 1, 0, 10, 'Initial stock on part creation', '2026-05-12 23:15:19'),
(29, 26, 1, 0, 6, 'Initial stock on part creation', '2026-05-12 23:16:25'),
(30, 27, 1, 0, 10, 'Initial stock on part creation', '2026-05-12 23:25:19'),
(31, 28, 1, 0, 20, 'Initial stock on part creation', '2026-05-12 23:29:41'),
(32, 7, 1, 9, 0, 'Stock updated via admin edit', '2026-05-12 23:30:07'),
(33, 7, 1, 0, 2, 'Stock updated via admin edit', '2026-05-12 23:30:25'),
(34, 29, 1, 0, 13, 'Initial stock on part creation', '2026-05-12 23:32:45'),
(35, 30, 1, 0, 123, 'Initial stock on part creation', '2026-05-12 23:38:59'),
(36, 8, 1, 0, 111, 'Stock updated via admin edit', '2026-05-12 23:41:23'),
(37, 9, 1, 4, 10, 'Stock updated via admin edit', '2026-05-12 23:41:36'),
(38, 31, 1, 0, 111, 'Initial stock on part creation', '2026-05-12 23:42:48'),
(39, 32, 1, 0, 1231, 'Initial stock on part creation', '2026-05-12 23:43:47'),
(40, 33, 1, 0, 20, 'Initial stock on part creation', '2026-05-13 08:47:48'),
(41, 37, 1, 0, 111, 'Initial stock on part creation', '2026-05-13 09:00:53'),
(42, 38, 1, 0, 20, 'Initial stock on part creation', '2026-05-13 09:21:37'),
(43, 39, 1, 0, 30000, 'Initial stock on part creation', '2026-05-14 20:03:15'),
(44, 2, 1, 3, 0, 'Stock updated via admin edit', '2026-05-14 20:03:32'),
(45, 2, 1, 0, 20, 'Stock updated via admin edit', '2026-05-14 20:03:49'),
(46, 10, 1, 0, 2, 'Stock updated via admin edit', '2026-05-14 20:04:09');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserId` int(11) NOT NULL,
  `RoleId` int(11) NOT NULL,
  `FirstName` varchar(100) NOT NULL,
  `LastName` varchar(100) NOT NULL,
  `Phone` varchar(30) DEFAULT NULL,
  `Username` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `IsActive` tinyint(4) NOT NULL DEFAULT 1,
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserId`, `RoleId`, `FirstName`, `LastName`, `Phone`, `Username`, `Password`, `IsActive`, `CreatedAt`) VALUES
(1, 1, 'System', 'Admin', '09123456789', 'admin_db', 'admin123', 1, '2026-04-09 20:53:24'),
(4, 2, 'ogie', 'reyes', '211231', 'eigo', 'eigo', 1, '2026-04-09 21:14:43'),
(5, 2, 'micheal', 'jordan', '09132003040', 'mikee', 'mike', 1, '2026-04-23 23:54:35'),
(6, 2, 'milo', 'bella', '09138818989', 'milo', 'milo', 1, '2026-05-02 20:14:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`CategoryId`),
  ADD UNIQUE KEY `uq_categories_name` (`CategoryName`);

--
-- Indexes for table `inquiries`
--
ALTER TABLE `inquiries`
  ADD PRIMARY KEY (`InquiryId`),
  ADD KEY `fk_inquiries_users` (`UserId`),
  ADD KEY `fk_inquiries_parts` (`PartId`);

--
-- Indexes for table `parts`
--
ALTER TABLE `parts`
  ADD PRIMARY KEY (`PartId`),
  ADD UNIQUE KEY `uq_parts_sku` (`SKU`),
  ADD KEY `fk_parts_categories` (`CategoryId`),
  ADD KEY `fk_parts_shops` (`ShopId`);

--
-- Indexes for table `part_features`
--
ALTER TABLE `part_features`
  ADD PRIMARY KEY (`FeatureId`),
  ADD KEY `fk_part_features_parts` (`PartId`);

--
-- Indexes for table `part_specs`
--
ALTER TABLE `part_specs`
  ADD PRIMARY KEY (`SpecId`),
  ADD KEY `fk_part_specs_parts` (`PartId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`RoleId`),
  ADD UNIQUE KEY `uq_roles_rolename` (`RoleName`);

--
-- Indexes for table `shops`
--
ALTER TABLE `shops`
  ADD PRIMARY KEY (`ShopId`);

--
-- Indexes for table `stock_logs`
--
ALTER TABLE `stock_logs`
  ADD PRIMARY KEY (`LogId`),
  ADD KEY `fk_stocklogs_parts` (`PartId`),
  ADD KEY `fk_stocklogs_users` (`ChangedBy`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserId`),
  ADD UNIQUE KEY `uq_users_username` (`Username`),
  ADD KEY `fk_users_roles` (`RoleId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `CategoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `inquiries`
--
ALTER TABLE `inquiries`
  MODIFY `InquiryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `parts`
--
ALTER TABLE `parts`
  MODIFY `PartId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `part_features`
--
ALTER TABLE `part_features`
  MODIFY `FeatureId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `part_specs`
--
ALTER TABLE `part_specs`
  MODIFY `SpecId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `RoleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `shops`
--
ALTER TABLE `shops`
  MODIFY `ShopId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `stock_logs`
--
ALTER TABLE `stock_logs`
  MODIFY `LogId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `inquiries`
--
ALTER TABLE `inquiries`
  ADD CONSTRAINT `fk_inquiries_parts` FOREIGN KEY (`PartId`) REFERENCES `parts` (`PartId`),
  ADD CONSTRAINT `fk_inquiries_users` FOREIGN KEY (`UserId`) REFERENCES `users` (`UserId`);

--
-- Constraints for table `parts`
--
ALTER TABLE `parts`
  ADD CONSTRAINT `fk_parts_categories` FOREIGN KEY (`CategoryId`) REFERENCES `categories` (`CategoryId`),
  ADD CONSTRAINT `fk_parts_shops` FOREIGN KEY (`ShopId`) REFERENCES `shops` (`ShopId`);

--
-- Constraints for table `part_features`
--
ALTER TABLE `part_features`
  ADD CONSTRAINT `fk_part_features_parts` FOREIGN KEY (`PartId`) REFERENCES `parts` (`PartId`) ON DELETE CASCADE;

--
-- Constraints for table `part_specs`
--
ALTER TABLE `part_specs`
  ADD CONSTRAINT `fk_part_specs_parts` FOREIGN KEY (`PartId`) REFERENCES `parts` (`PartId`) ON DELETE CASCADE;

--
-- Constraints for table `stock_logs`
--
ALTER TABLE `stock_logs`
  ADD CONSTRAINT `fk_stocklogs_parts` FOREIGN KEY (`PartId`) REFERENCES `parts` (`PartId`),
  ADD CONSTRAINT `fk_stocklogs_users` FOREIGN KEY (`ChangedBy`) REFERENCES `users` (`UserId`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_roles` FOREIGN KEY (`RoleId`) REFERENCES `roles` (`RoleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
