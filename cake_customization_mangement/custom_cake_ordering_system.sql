CREATE DATABASE  IF NOT EXISTS `custom_cake_ordering_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `custom_cake_ordering_system`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: custom_cake_ordering_system
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cake_design`
--

DROP TABLE IF EXISTS `cake_design`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cake_design` (
  `design_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `base_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `category_id` int DEFAULT NULL,
  `color` varchar(100) DEFAULT NULL,
  `pattern` varchar(100) DEFAULT NULL,
  `texture` varchar(100) DEFAULT NULL,
  `shape` varchar(100) DEFAULT NULL,
  `icing_type` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`design_id`),
  KEY `fk_cake_design_category` (`category_id`),
  CONSTRAINT `fk_cake_design_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cake_design`
--

LOCK TABLES `cake_design` WRITE;
/*!40000 ALTER TABLE `cake_design` DISABLE KEYS */;
INSERT INTO `cake_design` VALUES (5,'Floral Design','floral.jpg',0.00,NULL,NULL,NULL,NULL,NULL,NULL,0.00),(6,'Minimalist Design','minimalist.jpg',0.00,NULL,NULL,NULL,NULL,NULL,NULL,0.00),(7,'Cartoon Design','cartoon.jpg',0.00,NULL,NULL,NULL,NULL,NULL,NULL,0.00),(8,'Korean-Style Design','korean.jpg',0.00,NULL,NULL,NULL,NULL,NULL,NULL,0.00),(9,'Vintage Design','vintage.jpg',0.00,NULL,NULL,NULL,NULL,NULL,NULL,0.00);
/*!40000 ALTER TABLE `cake_design` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Birthday',0.00),(2,'Wedding',0.00),(3,'Cupcake',0.00),(4,'Anniversary',0.00),(5,'Custom',0.00);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flavor`
--

DROP TABLE IF EXISTS `flavor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flavor` (
  `flavor_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price_add` decimal(10,2) NOT NULL DEFAULT '0.00',
  `image` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`flavor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flavor`
--

LOCK TABLES `flavor` WRITE;
/*!40000 ALTER TABLE `flavor` DISABLE KEYS */;
INSERT INTO `flavor` VALUES (1,'Chocolate',120.00,'chocolate.jpg',0.00),(2,'Vanilla',0.00,'vanilla.jpg',0.00),(3,'Ube',20.00,'ube.jpg',0.00),(4,'Strawberry',25.00,'strawberry.jpg',0.00),(5,'Mocha',30.00,'mocha.jpg',0.00);
/*!40000 ALTER TABLE `flavor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size`
--

DROP TABLE IF EXISTS `size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `size` (
  `size_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`size_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size`
--

LOCK TABLES `size` WRITE;
/*!40000 ALTER TABLE `size` DISABLE KEYS */;
INSERT INTO `size` VALUES (1,'Small',300.00),(2,'Medium',500.00),(3,'Large',800.00);
/*!40000 ALTER TABLE `size` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-01 20:47:51
