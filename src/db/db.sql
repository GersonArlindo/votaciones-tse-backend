-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3307
-- Tiempo de generación: 23-02-2023 a las 01:21:22
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `initiate_365_app`
--
CREATE DATABASE IF NOT EXISTS `initiate_365_app` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `initiate_365_app`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_appointment_outcome`
--

CREATE TABLE IF NOT EXISTS `tbl_appointment_outcome` (
  `apptm_outcome_id` int(11) NOT NULL AUTO_INCREMENT,
  `apptm_outcome_name` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_modify` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`apptm_outcome_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_assign_appointment`
--

CREATE TABLE IF NOT EXISTS `tbl_assign_appointment` (
  `appointment_id` int(11) NOT NULL AUTO_INCREMENT,
  `appoinment_provider` int(11) DEFAULT NULL,
  `appointment_source` int(11) DEFAULT NULL,
  `project_manager` int(11) DEFAULT NULL,
  `agent_who_made_appointment` int(11) DEFAULT NULL,
  `lead_id` int(11) DEFAULT NULL,
  `language_id` int(11) DEFAULT NULL,
  `bill_amount` varchar(255) DEFAULT NULL,
  `credit_score` varchar(255) DEFAULT NULL,
  `bankrupcy` char(1) DEFAULT NULL,
  `attach_utility_bill` varchar(255) DEFAULT NULL,
  `additional_ub_image` varchar(255) DEFAULT NULL,
  `maps_image` varchar(255) DEFAULT NULL,
  `maps_imagestwo` varchar(255) DEFAULT NULL,
  `call_recoding_audio` varchar(255) DEFAULT NULL,
  `additional_call_recoding_audio` varchar(255) DEFAULT NULL,
  `current_energy_provider` int(11) DEFAULT NULL,
  `anual_usage` varchar(255) DEFAULT NULL,
  `type_of_roof` int(11) DEFAULT NULL,
  `roof_age` int(11) DEFAULT NULL,
  `change_roof` char(1) DEFAULT NULL,
  `meter` char(1) DEFAULT NULL,
  `appointment_type` char(1) DEFAULT NULL,
  `appointment_date` date DEFAULT NULL,
  `appointment_time` time DEFAULT NULL,
  `time_zone` int(11) DEFAULT NULL,
  `assign_appointment_to` int(11) DEFAULT NULL,
  `assigned_by` varchar(255) DEFAULT NULL,
  `sales_rep_id` int(11) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `appointment_type_available` varchar(255) DEFAULT NULL,
  `attendance_confirmed` int(11) DEFAULT NULL,
  `attendance_confirmed_datetime` datetime DEFAULT NULL,
  `appointment_status` int(11) DEFAULT NULL,
  `approved_by` int(11) DEFAULT NULL,
  `appointment_outcome` int(11) DEFAULT NULL,
  `design_for_this_lead` char(1) DEFAULT NULL,
  `additional_adders` text DEFAULT NULL,
  `additional_notes_designer` text DEFAULT NULL,
  `crc_date` date DEFAULT NULL,
  `financier` text DEFAULT NULL,
  `presentation_made_with` int(11) DEFAULT NULL,
  `account_number` int(11) DEFAULT NULL,
  `meter_number` int(11) DEFAULT NULL,
  `disqualification_reason` int(11) DEFAULT NULL,
  `docs_pending` varchar(255) DEFAULT NULL,
  `client_thinking` text DEFAULT NULL,
  `additional_comments` text DEFAULT NULL,
  `link_customer_profile` varchar(255) DEFAULT NULL,
  `link_proposal` varchar(255) DEFAULT NULL,
  `design_requested_counter` text DEFAULT NULL,
  `design_requested_by` varchar(255) DEFAULT NULL,
  `design_requested_datetime` datetime DEFAULT NULL,
  `date_created` datetime DEFAULT current_timestamp(),
  `created_by` int(11) DEFAULT NULL,
  `date_modify` datetime DEFAULT current_timestamp(),
  `modify_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`appointment_id`),
  KEY `appoinment_provider` (`appoinment_provider`),
  KEY `appointment_outcome` (`appointment_outcome`),
  KEY `sales_rep_id` (`sales_rep_id`),
  KEY `state_id` (`state_id`),
  KEY `type_of_roof` (`type_of_roof`),
  KEY `language_id` (`language_id`),
  KEY `current_energy_provider` (`current_energy_provider`),
  KEY `lead_id` (`lead_id`),
  KEY `disqualification_reason` (`disqualification_reason`),
  KEY `time_zone` (`time_zone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_disqualifications`
--

CREATE TABLE IF NOT EXISTS `tbl_disqualifications` (
  `disqualification_id` int(11) NOT NULL AUTO_INCREMENT,
  `disqualification_name` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_modify` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`disqualification_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_energy_provider`
--

CREATE TABLE IF NOT EXISTS `tbl_energy_provider` (
  `energy_provider_id` int(11) NOT NULL AUTO_INCREMENT,
  `energy_provider_name` varchar(255) NOT NULL,
  `energy_provider_description` text NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_modify` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`energy_provider_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_installers`
--

CREATE TABLE IF NOT EXISTS `tbl_installers` (
  `installer_id` int(11) NOT NULL AUTO_INCREMENT,
  `epc_name` varchar(255) NOT NULL,
  `installers_images` varchar(255) NOT NULL,
  `state_id` int(11) NOT NULL,
  `contact_email` varchar(255) NOT NULL,
  `installers_phone` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(255) NOT NULL,
  `date_modify` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`installer_id`),
  KEY `state_id` (`state_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_installers`
--

INSERT INTO `tbl_installers` (`installer_id`, `epc_name`, `installers_images`, `state_id`, `contact_email`, `installers_phone`, `date_created`, `created_by`, `date_modify`) VALUES
(1, 'bliss appointment', 'imagen1', 3, 'bliss@gmail.com', '7458963257', '2023-02-11 17:12:33', 'Alberto Turcios', '2023-02-11 17:12:33'),
(2, 'ez marketing', 'https://ez-marketing-bucket.s3.us-east-2.amazonaws.com/muestra.png', 4, 'bliss@gmail.com', '5555555555', '2023-02-22 23:55:27', 'Alberto Turcios', '2023-02-22 23:55:27'),
(3, 'Data', 'https://ez-marketing-bucket.s3.us-east-2.amazonaws.com/muestra.png', 4, 'bliss@gmail.ci', '6666666666', '2023-02-22 23:58:11', 'Alberto Turcios', '2023-02-22 23:58:11'),
(4, 'kithy ', 'https://ez-marketing-bucket.s3.us-east-2.amazonaws.com/muestra.png', 3, 'jose.nae@gmail.com', '5555555555', '2023-02-23 00:01:37', 'Alberto Turcios', '2023-02-23 00:01:37'),
(5, 'ez marketingss', 'https://ez-marketing-bucket.s3.us-east-2.amazonaws.com/muestra.png', 4, 'bliss@gmail.ci', '6666666666', '2023-02-23 00:14:42', 'Alberto Turcios', '2023-02-23 00:14:42');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_languages`
--

CREATE TABLE IF NOT EXISTS `tbl_languages` (
  `language_id` int(11) NOT NULL AUTO_INCREMENT,
  `language_name` varchar(255) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_modify` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`language_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_languages`
--

INSERT INTO `tbl_languages` (`language_id`, `language_name`, `date_created`, `date_modify`) VALUES
(1, 'Ingles', '2023-02-03 23:11:54', '2023-02-03 23:11:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_leads`
--

CREATE TABLE IF NOT EXISTS `tbl_leads` (
  `lead_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `st_address` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip_code` varchar(255) NOT NULL,
  `full_address` varchar(255) NOT NULL,
  `source` varchar(255) NOT NULL,
  `campaign_name` varchar(255) NOT NULL,
  `ad_set_name` varchar(255) NOT NULL,
  `ad_name` varchar(255) NOT NULL,
  `agent_assigned` varchar(255) NOT NULL,
  `outcome` varchar(255) NOT NULL,
  `tags` varchar(255) NOT NULL,
  `notes` varchar(255) NOT NULL,
  `date_create` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_modify` timestamp NOT NULL DEFAULT current_timestamp(),
  `modification_by` varchar(255) NOT NULL,
  PRIMARY KEY (`lead_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_leads`
--

INSERT INTO `tbl_leads` (`lead_id`, `first_name`, `last_name`, `phone_number`, `email`, `st_address`, `state`, `zip_code`, `full_address`, `source`, `campaign_name`, `ad_set_name`, `ad_name`, `agent_assigned`, `outcome`, `tags`, `notes`, `date_create`, `date_modify`, `modification_by`) VALUES
(1, '', 'Prueba', '76731965', 'prueba@gmail.com', 'Address prueba', 'prueba', '123', 'Address Full ', 'Source Prueba', 'Prueba', 'Prueba', 'Prueba', 'Prueba', 'Prueba', 'Prueba', 'Prueba', '2023-02-06 20:50:56', '2023-02-06 20:50:56', 'Prueba');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_modulos`
--

CREATE TABLE IF NOT EXISTS `tbl_modulos` (
  `mod_id` int(11) NOT NULL AUTO_INCREMENT,
  `mod_nombre` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_modify` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`mod_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tbl_modulos`
--

INSERT INTO `tbl_modulos` (`mod_id`, `mod_nombre`, `date_created`, `date_modify`) VALUES
(1, 'users 1', '2023-02-22 17:44:24', '2023-02-22 17:44:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_permisos`
--

CREATE TABLE IF NOT EXISTS `tbl_permisos` (
  `per_id` int(11) NOT NULL AUTO_INCREMENT,
  `per_nombre` varchar(50) NOT NULL,
  `mod_id` int(11) NOT NULL,
  PRIMARY KEY (`per_id`),
  KEY `mod_id` (`mod_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_provider`
--

CREATE TABLE IF NOT EXISTS `tbl_provider` (
  `provider_id` int(11) NOT NULL AUTO_INCREMENT,
  `name_provider` varchar(255) NOT NULL,
  `status` char(1) NOT NULL DEFAULT '1',
  `description_provider` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_modify` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`provider_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_roles`
--

CREATE TABLE IF NOT EXISTS `tbl_roles` (
  `rol_id` int(11) NOT NULL AUTO_INCREMENT,
  `rol_rol` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `rol_descripcion` text COLLATE utf8_spanish_ci NOT NULL,
  `rol_created` datetime NOT NULL DEFAULT current_timestamp(),
  `rol_modify` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`rol_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Tabla de administracion de permisos';

--
-- Volcado de datos para la tabla `tbl_roles`
--

INSERT INTO `tbl_roles` (`rol_id`, `rol_rol`, `rol_descripcion`, `rol_created`, `rol_modify`) VALUES
(1, 'Administrador', 'Administrador', '2023-02-03 13:05:08', '2023-02-03 13:05:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_rol_permiso`
--

CREATE TABLE IF NOT EXISTS `tbl_rol_permiso` (
  `rol_permiso_id` int(11) NOT NULL AUTO_INCREMENT,
  `rol_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`rol_permiso_id`),
  KEY `rol_id` (`rol_id`,`permission_id`),
  KEY `permission_id` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_sales_rep`
--

CREATE TABLE IF NOT EXISTS `tbl_sales_rep` (
  `sales_rep_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `state_id` int(11) NOT NULL,
  `Appointment_type_availability` char(1) NOT NULL,
  `appt_status` char(1) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(255) NOT NULL,
  `date_modify` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`sales_rep_id`),
  KEY `user_id` (`user_id`,`state_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_states`
--

CREATE TABLE IF NOT EXISTS `tbl_states` (
  `state_id` int(11) NOT NULL AUTO_INCREMENT,
  `name_state` varchar(255) NOT NULL,
  `abbreviation` varchar(255) DEFAULT NULL,
  `covered_virtually` char(1) NOT NULL,
  `covered_inperson` char(1) NOT NULL,
  `status` char(1) NOT NULL DEFAULT '1',
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_modify` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`state_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_states`
--

INSERT INTO `tbl_states` (`state_id`, `name_state`, `abbreviation`, `covered_virtually`, `covered_inperson`, `status`, `date_created`, `date_modify`) VALUES
(3, 'New York', 'NY', '1', '1', '1', '2023-02-22 23:51:55', '2023-02-22 23:51:55'),
(4, 'New Jersey', 'NJ', '1', '1', '1', '2023-02-22 23:54:18', '2023-02-22 23:54:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_time_zone`
--

CREATE TABLE IF NOT EXISTS `tbl_time_zone` (
  `time_zone_id` int(11) NOT NULL AUTO_INCREMENT,
  `time_zone_name` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_modify` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`time_zone_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_type_roof`
--

CREATE TABLE IF NOT EXISTS `tbl_type_roof` (
  `roof_id` int(11) NOT NULL AUTO_INCREMENT,
  `roof_name` varchar(255) NOT NULL,
  `description_roof` text NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_modify` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`roof_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_users`
--

CREATE TABLE IF NOT EXISTS `tbl_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `user_images` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `language_id` int(11) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `status` char(1) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_modify` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`user_id`),
  KEY `language_id` (`language_id`),
  KEY `u_rol` (`rol_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_users`
--

INSERT INTO `tbl_users` (`user_id`, `first_name`, `last_name`, `username`, `user_images`, `email`, `password`, `phone_number`, `language_id`, `rol_id`, `status`, `date_created`, `date_modify`) VALUES
(1, 'Jhojaira', 'Abigail', 'Jhoja', '', 'jhojaira@ez-marketing.us', '$2a$10$nYtk/WuDz5vb2.cxgILljeHD2rKHFjLEZHbiXaVKPX5z5BeoDf8IG', '75757364', 1, 1, '1', '2023-02-04 04:31:45', '2023-02-04 04:31:45'),
(3, 'Alberto', 'Turcios', 'amto_', '', 'alberto-turcios@ez-marketing.us', '$2a$10$nYtk/WuDz5vb2.cxgILljeHD2rKHFjLEZHbiXaVKPX5z5BeoDf8IG', '75757364', 1, 1, '1', '2023-02-08 01:07:29', '2023-02-08 01:07:29');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tbl_assign_appointment`
--
ALTER TABLE `tbl_assign_appointment`
  ADD CONSTRAINT `tbl_assign_appointment_ibfk_1` FOREIGN KEY (`appoinment_provider`) REFERENCES `tbl_provider` (`provider_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_assign_appointment_ibfk_10` FOREIGN KEY (`time_zone`) REFERENCES `tbl_time_zone` (`time_zone_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_assign_appointment_ibfk_2` FOREIGN KEY (`appointment_outcome`) REFERENCES `tbl_appointment_outcome` (`apptm_outcome_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_assign_appointment_ibfk_3` FOREIGN KEY (`state_id`) REFERENCES `tbl_states` (`state_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_assign_appointment_ibfk_4` FOREIGN KEY (`sales_rep_id`) REFERENCES `tbl_sales_rep` (`sales_rep_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_assign_appointment_ibfk_5` FOREIGN KEY (`type_of_roof`) REFERENCES `tbl_type_roof` (`roof_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_assign_appointment_ibfk_6` FOREIGN KEY (`language_id`) REFERENCES `tbl_languages` (`language_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_assign_appointment_ibfk_7` FOREIGN KEY (`current_energy_provider`) REFERENCES `tbl_energy_provider` (`energy_provider_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_assign_appointment_ibfk_8` FOREIGN KEY (`lead_id`) REFERENCES `tbl_leads` (`lead_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_assign_appointment_ibfk_9` FOREIGN KEY (`disqualification_reason`) REFERENCES `tbl_disqualifications` (`disqualification_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbl_installers`
--
ALTER TABLE `tbl_installers`
  ADD CONSTRAINT `tbl_installers_state_id_fk` FOREIGN KEY (`state_id`) REFERENCES `tbl_states` (`state_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbl_permisos`
--
ALTER TABLE `tbl_permisos`
  ADD CONSTRAINT `tbl_permisos_ibfk_1` FOREIGN KEY (`mod_id`) REFERENCES `tbl_modulos` (`mod_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbl_rol_permiso`
--
ALTER TABLE `tbl_rol_permiso`
  ADD CONSTRAINT `tbl_rol_permiso_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `tbl_roles` (`rol_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_rol_permiso_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `tbl_permisos` (`per_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD CONSTRAINT `tbl_users_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `tbl_languages` (`language_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_users_ibfk_2` FOREIGN KEY (`rol_id`) REFERENCES `tbl_roles` (`rol_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
