-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-09-2023 a las 22:59:21
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `votaciones_tse_es`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `MODULE_POSITION` (IN `rol_Id` INT)   SELECT mod_id, mod_nombre
	FROM tbl_modulos
	where mod_id NOT in (
	        select tbl_permisos.mod_id
	        from tbl_permisos
	        where
	            tbl_permisos.rol_id = rol_Id
	    )$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_audio`
--

CREATE TABLE `tbl_audio` (
  `id_audio` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `ruta_audio` text NOT NULL,
  `type_audio` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_contract`
--

CREATE TABLE `tbl_contract` (
  `contract_id` int(11) NOT NULL,
  `installer_id` int(11) NOT NULL,
  `contract_typed` int(11) NOT NULL,
  `contract_name` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `modify_by` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_contract`
--

INSERT INTO `tbl_contract` (`contract_id`, `installer_id`, `contract_typed`, `contract_name`, `date_created`, `modify_by`) VALUES
(1, 1, 1, 'IMPLEMENTACIÃN DE PROGRAMA DE PREVENCIÃN DE ACCIDENTES (1) (2).pdf', '2023-06-09 19:23:49', 'Alberto Turcios'),
(2, 1, 2, 'Proyecto_de_catedra_PAEO (9).pdf', '2023-06-09 19:23:49', 'Alberto Turcios');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_docbill`
--

CREATE TABLE `tbl_docbill` (
  `id_document_bill` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `ruta_document` text NOT NULL,
  `status` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_images`
--

CREATE TABLE `tbl_images` (
  `id_image` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `ruta_image` text NOT NULL,
  `type_img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_languages`
--

CREATE TABLE `tbl_languages` (
  `language_id` int(11) NOT NULL,
  `language_name` varchar(255) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_modify` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_languages`
--

INSERT INTO `tbl_languages` (`language_id`, `language_name`, `date_created`, `date_modify`) VALUES
(1, 'Ingles', '2023-02-03 23:11:54', '2023-02-03 23:11:54'),
(3, 'Portugues', '2023-03-06 19:49:26', '2023-03-06 19:49:26'),
(4, 'Español', '2023-03-10 14:15:20', '2023-03-10 14:15:20'),
(5, 'Mandarin', '2023-03-13 15:14:04', '2023-03-13 15:14:04'),
(7, 'Japones', '2023-03-13 15:16:07', '2023-03-13 15:16:07'),
(9, 'Frances', '2023-03-27 16:28:30', '2023-03-27 16:28:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_modulos`
--

CREATE TABLE `tbl_modulos` (
  `mod_id` int(11) NOT NULL,
  `mod_nombre` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_modify` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tbl_modulos`
--

INSERT INTO `tbl_modulos` (`mod_id`, `mod_nombre`, `date_created`, `date_modify`) VALUES
(1, 'Usuarios', '2023-02-22 17:44:24', '2023-02-22 17:44:24'),
(3, 'Lenguajes', '2023-02-27 20:13:04', '2023-02-27 20:13:04'),
(4, 'Panel', '2023-02-27 22:31:27', '2023-02-27 22:31:27'),
(21, 'Partidos Políticos', '2023-06-25 14:09:15', '2023-06-25 14:09:15'),
(22, 'Personas Naturales', '2023-06-25 14:26:16', '2023-06-25 14:26:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_partidos_politicos`
--

CREATE TABLE `tbl_partidos_politicos` (
  `id_partido` int(11) NOT NULL,
  `nombre` text DEFAULT NULL,
  `sigla` varchar(255) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `representante_legal` varchar(255) DEFAULT NULL,
  `estado` char(1) DEFAULT NULL,
  `imagen` text DEFAULT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_partidos_politicos`
--

INSERT INTO `tbl_partidos_politicos` (`id_partido`, `nombre`, `sigla`, `direccion`, `telefono`, `representante_legal`, `estado`, `imagen`, `date_created`) VALUES
(2, 'test', 'test', 'test', 'test', 'test', '1', 'muestra.png', '2023-06-24 23:24:47'),
(3, 'Prueba', 'PRV', 'Prueba Direccion', '50376731965', 'A YO', '1', 'tse_logo2.jpg', '2023-06-25 02:45:08'),
(4, 'otro test', 'OT', 'Av. Nueva España, Barrio Nueva España Chinameca San Miguel', '50376731965', 'A YO', '0', '1.png', '2023-06-25 03:00:10'),
(5, 'tes 1', 'tes 1', 'tes 1', '77777777777', 'tes 1', '1', 'Rojo y Negro Jugador Oscuro Deportes YouTube Portada.png', '2023-06-25 03:12:31'),
(7, 'Alianza Republicana Nacionalista ', 'ARENA', 'Prolongación Calle Arce N. 2429. Entre 45 y 47 Ave. Norte, Col. Flor Blanca, SS', '50322604400', 'Carlos García Saade', '1', 'ARENA.jpg', '2023-06-25 14:42:23'),
(8, 'Partido Cambio Democrático', 'CD', ' Quinta Calle Poniente entre 15 Avenida y 17 Avenida Norte, San Salvador', '50311111111', 'Javier Milián', '1', 'CD.jpg', '2023-06-25 14:44:12'),
(9, 'Partido Democracia Salvadoreña', 'DS', '3ª Calle Poniente, entre 69 y 71 Avenida Norte, N. 3647, Colonia Escalón, SS', '50322461600', 'Adolfo Salume Artiñano', '1', 'DS.jpg', '2023-06-25 14:45:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_permisos`
--

CREATE TABLE `tbl_permisos` (
  `per_id` int(11) NOT NULL,
  `mod_id` int(11) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `create` int(11) NOT NULL DEFAULT 0,
  `read` int(11) NOT NULL DEFAULT 0,
  `update` int(11) NOT NULL DEFAULT 0,
  `deleted` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tbl_permisos`
--

INSERT INTO `tbl_permisos` (`per_id`, `mod_id`, `rol_id`, `create`, `read`, `update`, `deleted`, `status`) VALUES
(1, 1, 1, 1, 1, 1, 1, 1),
(7, 4, 1, 1, 1, 1, 1, 0),
(8, 3, 1, 1, 1, 1, 1, 1),
(30, 21, 1, 1, 1, 1, 1, 1),
(31, 22, 1, 1, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_personas_naturales`
--

CREATE TABLE `tbl_personas_naturales` (
  `id_persona` int(11) NOT NULL,
  `dui_persona` varchar(255) NOT NULL,
  `persona_image` text NOT NULL,
  `nombre_persona` varchar(255) NOT NULL,
  `apellidos_persona` varchar(255) NOT NULL,
  `genero` varchar(255) NOT NULL,
  `departamento` varchar(255) NOT NULL,
  `municipio` varchar(255) NOT NULL,
  `direccion_persona` varchar(255) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_personas_naturales`
--

INSERT INTO `tbl_personas_naturales` (`id_persona`, `dui_persona`, `persona_image`, `nombre_persona`, `apellidos_persona`, `genero`, `departamento`, `municipio`, `direccion_persona`, `fecha_nacimiento`, `fecha_creacion`) VALUES
(2, '05912933-0', 'jhojaira.JPG', 'Jhojaira', 'Márquez', 'Femenino', 'San Miguel', 'San Miguel', 'Colonia Santa Julia psje Garcilazo', '1999-08-08', '2023-06-24 17:55:28'),
(3, '06624515-6', 'muestra.png', 'Gerson Arlindo', 'Calis', 'Masculino', 'San Miguel', 'San Miguel', 'GUEGUECHO', '1999-08-08', '2023-06-25 01:20:51');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_roles`
--

CREATE TABLE `tbl_roles` (
  `rol_id` int(11) NOT NULL,
  `rol_rol` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `rol_descripcion` text COLLATE utf8_spanish_ci NOT NULL,
  `rol_created` datetime NOT NULL DEFAULT current_timestamp(),
  `rol_modify` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Tabla de administracion de permisos';

--
-- Volcado de datos para la tabla `tbl_roles`
--

INSERT INTO `tbl_roles` (`rol_id`, `rol_rol`, `rol_descripcion`, `rol_created`, `rol_modify`) VALUES
(1, 'Administrador', 'Administrador', '2023-02-03 13:05:08', '2023-02-03 13:05:08'),
(2, 'Agent', 'Agent', '2023-02-28 19:11:09', '2023-02-28 19:11:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_rol_permiso`
--

CREATE TABLE `tbl_rol_permiso` (
  `rol_permiso_id` int(11) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tbl_rol_permiso`
--

INSERT INTO `tbl_rol_permiso` (`rol_permiso_id`, `rol_id`, `permission_id`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_users`
--

CREATE TABLE `tbl_users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `user_images` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `language_id` int(11) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `status` char(1) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_modify` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_users`
--

INSERT INTO `tbl_users` (`user_id`, `first_name`, `last_name`, `birthdate`, `username`, `user_images`, `email`, `password`, `phone_number`, `language_id`, `rol_id`, `status`, `date_created`, `date_modify`) VALUES
(8, 'Gerson', 'Calis', '2023-03-01', 'Gerson Calis', 'disqualification.PNG', 'gerson@ez-marketing.us', '$2a$10$OlQf.Oq7JDdXHmuabiipVuCq8J4EAbL.DjVwt7Z.ln91Lk9UsPb5q', '50376731965', 1, 1, '1', '2023-02-25 15:24:17', '2023-02-25 15:24:17'),
(15, 'Gerson', 'Gonzalez', '2023-04-05', 'dev', '1674684933081.png', 'gerson50039@gmail.com', '$2a$10$tKgTahXcfVOGamTrYRfe7eVbGceR.3Tbmm/3ysjxLncZhpk52xGRO', '+503 7575-7364', 1, 1, '1', '2023-04-03 21:27:36', '2023-04-03 21:27:36'),
(18, 'test', 'test', '2023-06-22', 'test', 'https://ez-marketing-images.s3.us-west-2.amazonaws.com/muestra.png', 'test@test.com', '$2a$10$jhqD17YdOwDsBeK7rH3zkOjOhY4Rba9vK4L2rfTKZnfzLac8Ay3CG', '50370345924', 4, 1, '1', '2023-06-24 03:26:38', '2023-06-24 03:26:38'),
(19, 'prueba', 'prueba', '2023-06-01', 'prueba', '2.png', 'prueba@gmail.com', '$2a$10$vGeZaR28fP.hMk72iRSbjev5Khec8BTC9hBz0vGnfz2b.UGyO/D0y', '50376731965', 5, 1, '1', '2023-06-24 18:31:14', '2023-06-24 18:31:14');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbl_audio`
--
ALTER TABLE `tbl_audio`
  ADD PRIMARY KEY (`id_audio`),
  ADD KEY `appointment_id` (`appointment_id`);

--
-- Indices de la tabla `tbl_contract`
--
ALTER TABLE `tbl_contract`
  ADD PRIMARY KEY (`contract_id`),
  ADD KEY `installer_id` (`installer_id`);

--
-- Indices de la tabla `tbl_docbill`
--
ALTER TABLE `tbl_docbill`
  ADD PRIMARY KEY (`id_document_bill`),
  ADD KEY `appointment_id` (`appointment_id`);

--
-- Indices de la tabla `tbl_images`
--
ALTER TABLE `tbl_images`
  ADD PRIMARY KEY (`id_image`),
  ADD KEY `appointment_id` (`appointment_id`);

--
-- Indices de la tabla `tbl_languages`
--
ALTER TABLE `tbl_languages`
  ADD PRIMARY KEY (`language_id`);

--
-- Indices de la tabla `tbl_modulos`
--
ALTER TABLE `tbl_modulos`
  ADD PRIMARY KEY (`mod_id`) USING BTREE;

--
-- Indices de la tabla `tbl_partidos_politicos`
--
ALTER TABLE `tbl_partidos_politicos`
  ADD PRIMARY KEY (`id_partido`);

--
-- Indices de la tabla `tbl_permisos`
--
ALTER TABLE `tbl_permisos`
  ADD PRIMARY KEY (`per_id`),
  ADD KEY `mod_id` (`mod_id`),
  ADD KEY `foreign_key_rol_id` (`rol_id`);

--
-- Indices de la tabla `tbl_personas_naturales`
--
ALTER TABLE `tbl_personas_naturales`
  ADD PRIMARY KEY (`id_persona`);

--
-- Indices de la tabla `tbl_roles`
--
ALTER TABLE `tbl_roles`
  ADD PRIMARY KEY (`rol_id`);

--
-- Indices de la tabla `tbl_rol_permiso`
--
ALTER TABLE `tbl_rol_permiso`
  ADD PRIMARY KEY (`rol_permiso_id`),
  ADD KEY `rol_id` (`rol_id`,`permission_id`),
  ADD KEY `permission_id` (`permission_id`);

--
-- Indices de la tabla `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `language_id` (`language_id`),
  ADD KEY `u_rol` (`rol_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbl_audio`
--
ALTER TABLE `tbl_audio`
  MODIFY `id_audio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbl_contract`
--
ALTER TABLE `tbl_contract`
  MODIFY `contract_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tbl_docbill`
--
ALTER TABLE `tbl_docbill`
  MODIFY `id_document_bill` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tbl_images`
--
ALTER TABLE `tbl_images`
  MODIFY `id_image` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tbl_languages`
--
ALTER TABLE `tbl_languages`
  MODIFY `language_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `tbl_modulos`
--
ALTER TABLE `tbl_modulos`
  MODIFY `mod_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `tbl_partidos_politicos`
--
ALTER TABLE `tbl_partidos_politicos`
  MODIFY `id_partido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `tbl_permisos`
--
ALTER TABLE `tbl_permisos`
  MODIFY `per_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `tbl_personas_naturales`
--
ALTER TABLE `tbl_personas_naturales`
  MODIFY `id_persona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tbl_roles`
--
ALTER TABLE `tbl_roles`
  MODIFY `rol_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tbl_rol_permiso`
--
ALTER TABLE `tbl_rol_permiso`
  MODIFY `rol_permiso_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
