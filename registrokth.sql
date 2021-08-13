-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 13-08-2021 a las 22:10:53
-- Versión del servidor: 5.7.31
-- Versión de PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `registrokth`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registros`
--

DROP TABLE IF EXISTS `registros`;
CREATE TABLE IF NOT EXISTS `registros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `game` varchar(100) NOT NULL,
  `contra` varchar(250) NOT NULL,
  `repcontra` varchar(250) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `registros`
--

INSERT INTO `registros` (`id`, `nombre`, `apellido`, `game`, `contra`, `repcontra`, `email`) VALUES
(1, 'Francisco', 'Montenegro', '', 'holis', 'holis', 'emal@hotmail.com'),
(5, 'Lothar', 'Mathaus', '', 'lolcito', 'lolcito', 'emal@hotmail.com'),
(6, 'Goku', 'Mathaus', '', 'lolcito', 'lolcito', 'emal@hotmail.com'),
(7, 'Gohan', 'MCAllister', '', 'lolcito', 'lolcito', 'goan@gmail.com'),
(8, 'Jhon', 'Smith', '', 'wear', 'wear', 'jhon@gmail.com'),
(10, 'Esteban', 'Mathaus', '', 'lola', 'lola', 'estbs@gmail.com'),
(11, 'Francisco', 'Montenegro', '', '1234', '1234', 'ismith@gmail.com'),
(15, 'lolas', 'lilt', '', '123', '123', 'aaa@ddd'),
(20, 'Ricardo', 'Gareca', '1', 'lolcito', 'lolcito', 'Rgareca@gmail.com'),
(21, 'Juan', 'Simon', 'APEX LEGENDS', 'rico', 'rico', 'juansito@gmial.com'),
(22, 'Hugo', 'Sanchez', 'CS:GO', 'fol', 'fol', 'juguito@gmail.com'),
(23, 'Lucas', 'Del Piero', 'CS:GO', 'caos', 'caos', 'luqi@gmail.com');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
