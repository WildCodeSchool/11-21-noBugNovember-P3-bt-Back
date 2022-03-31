-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: localhost    Database: btht_empty
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `forgetPassword` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `feedbackClient` longtext,
  `numClients` varchar(100) DEFAULT NULL,
  `companyType_id` int NOT NULL,
  `company_id` int NOT NULL,
  PRIMARY KEY (`id`,`companyType_id`,`company_id`),
  KEY `fk_clients_companyType_idx` (`companyType_id`),
  KEY `fk_clients_company1_idx` (`company_id`),
  CONSTRAINT `fk_clients_company1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_clients_companyType` FOREIGN KEY (`companyType_id`) REFERENCES `companytype` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients_has_contacttype`
--

DROP TABLE IF EXISTS `clients_has_contacttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients_has_contacttype` (
  `clients_id` int NOT NULL,
  `contactType_id` int NOT NULL,
  PRIMARY KEY (`clients_id`,`contactType_id`),
  KEY `fk_clients_has_contactType_contactType1_idx` (`contactType_id`),
  KEY `fk_clients_has_contactType_clients1_idx` (`clients_id`),
  CONSTRAINT `fk_clients_has_contactType_clients1` FOREIGN KEY (`clients_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_clients_has_contactType_contactType1` FOREIGN KEY (`contactType_id`) REFERENCES `contacttype` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients_has_contacttype`
--

LOCK TABLES `clients_has_contacttype` WRITE;
/*!40000 ALTER TABLE `clients_has_contacttype` DISABLE KEYS */;
/*!40000 ALTER TABLE `clients_has_contacttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients_has_languages`
--

DROP TABLE IF EXISTS `clients_has_languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients_has_languages` (
  `clients_id` int NOT NULL,
  `languages_id` int NOT NULL,
  PRIMARY KEY (`clients_id`,`languages_id`),
  KEY `fk_clients_has_languages_languages1_idx` (`languages_id`),
  KEY `fk_clients_has_languages_clients1_idx` (`clients_id`),
  CONSTRAINT `fk_clients_has_languages_clients1` FOREIGN KEY (`clients_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_clients_has_languages_languages1` FOREIGN KEY (`languages_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients_has_languages`
--

LOCK TABLES `clients_has_languages` WRITE;
/*!40000 ALTER TABLE `clients_has_languages` DISABLE KEYS */;
/*!40000 ALTER TABLE `clients_has_languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients_has_service`
--

DROP TABLE IF EXISTS `clients_has_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients_has_service` (
  `clients_id` int NOT NULL,
  `service_id` int NOT NULL,
  PRIMARY KEY (`clients_id`,`service_id`),
  KEY `fk_clients_has_service_service1_idx` (`service_id`),
  KEY `fk_clients_has_service_clients1_idx` (`clients_id`),
  CONSTRAINT `fk_clients_has_service_clients1` FOREIGN KEY (`clients_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_clients_has_service_service1` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients_has_service`
--

LOCK TABLES `clients_has_service` WRITE;
/*!40000 ALTER TABLE `clients_has_service` DISABLE KEYS */;
/*!40000 ALTER TABLE `clients_has_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `id` int NOT NULL AUTO_INCREMENT,
  `companyName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companytype`
--

DROP TABLE IF EXISTS `companytype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companytype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `companyTypeName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companytype`
--

LOCK TABLES `companytype` WRITE;
/*!40000 ALTER TABLE `companytype` DISABLE KEYS */;
/*!40000 ALTER TABLE `companytype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacttype`
--

DROP TABLE IF EXISTS `contacttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacttype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contactTypeName` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacttype`
--

LOCK TABLES `contacttype` WRITE;
/*!40000 ALTER TABLE `contacttype` DISABLE KEYS */;
INSERT INTO `contacttype` VALUES (1,'Phone'),(2,'Mail'),(3,'Google Meet'),(4,'Whatsapp'),(5,'Zoom'),(6,'Discord'),(7,'Linkedin');
/*!40000 ALTER TABLE `contacttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expertiselevel`
--

DROP TABLE IF EXISTS `expertiselevel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expertiselevel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `expertiseLevelName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expertiselevel`
--

LOCK TABLES `expertiselevel` WRITE;
/*!40000 ALTER TABLE `expertiselevel` DISABLE KEYS */;
INSERT INTO `expertiselevel` VALUES (1,'> 15 years exp'),(2,'> 10 years exp'),(3,'> 5 years exp'),(4,'> 3 years exp');
/*!40000 ALTER TABLE `expertiselevel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experts`
--

DROP TABLE IF EXISTS `experts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `company_id` int NOT NULL,
  `linkedinProfile` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `numExpert` varchar(255) DEFAULT NULL,
  `kindOfExpert_id` int NOT NULL,
  `practice_id` int NOT NULL,
  `expertiseLevel_id` int NOT NULL,
  `feedbackExpert` varchar(45) DEFAULT NULL,
  `cost` int DEFAULT NULL,
  `keywords` varchar(45) DEFAULT NULL,
  `jobtitle_id` int NOT NULL,
  PRIMARY KEY (`id`,`company_id`,`kindOfExpert_id`,`practice_id`,`expertiseLevel_id`,`jobtitle_id`),
  KEY `fk_experts_kindOfExpert1_idx` (`kindOfExpert_id`),
  KEY `fk_experts_practice1_idx` (`practice_id`),
  KEY `fk_experts_expertiseLevel1_idx` (`expertiseLevel_id`),
  KEY `fk_experts_company1_idx` (`company_id`),
  KEY `fk_experts_jobtitle1_idx` (`jobtitle_id`),
  CONSTRAINT `fk_experts_company1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_experts_expertiseLevel1` FOREIGN KEY (`expertiseLevel_id`) REFERENCES `expertiselevel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_experts_jobtitle1` FOREIGN KEY (`jobtitle_id`) REFERENCES `jobtitle` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_experts_kindOfExpert1` FOREIGN KEY (`kindOfExpert_id`) REFERENCES `kindofexpert` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_experts_practice1` FOREIGN KEY (`practice_id`) REFERENCES `practice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experts`
--

LOCK TABLES `experts` WRITE;
/*!40000 ALTER TABLE `experts` DISABLE KEYS */;
/*!40000 ALTER TABLE `experts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experts_has_contacttype`
--

DROP TABLE IF EXISTS `experts_has_contacttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experts_has_contacttype` (
  `experts_id` int NOT NULL,
  `contacttype_id` int NOT NULL,
  PRIMARY KEY (`experts_id`,`contacttype_id`),
  KEY `fk_experts_has_contacttype_contacttype1_idx` (`contacttype_id`),
  CONSTRAINT `fk_experts_has_contactType_contactType1` FOREIGN KEY (`contacttype_id`) REFERENCES `contacttype` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_experts_has_contactType_experts1` FOREIGN KEY (`experts_id`) REFERENCES `experts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experts_has_contacttype`
--

LOCK TABLES `experts_has_contacttype` WRITE;
/*!40000 ALTER TABLE `experts_has_contacttype` DISABLE KEYS */;
/*!40000 ALTER TABLE `experts_has_contacttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experts_has_fonction`
--

DROP TABLE IF EXISTS `experts_has_fonction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experts_has_fonction` (
  `experts_id` int NOT NULL,
  `fonction_id` int NOT NULL,
  PRIMARY KEY (`experts_id`,`fonction_id`),
  KEY `fk_experts_has_fonction_fonction1_idx` (`fonction_id`),
  CONSTRAINT `fk_experts_has_fonction_experts1` FOREIGN KEY (`experts_id`) REFERENCES `experts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_experts_has_fonction_fonction1` FOREIGN KEY (`fonction_id`) REFERENCES `fonction` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experts_has_fonction`
--

LOCK TABLES `experts_has_fonction` WRITE;
/*!40000 ALTER TABLE `experts_has_fonction` DISABLE KEYS */;
/*!40000 ALTER TABLE `experts_has_fonction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experts_has_geoexpertise`
--

DROP TABLE IF EXISTS `experts_has_geoexpertise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experts_has_geoexpertise` (
  `experts_id` int NOT NULL,
  `geoExpertise_id` int NOT NULL,
  PRIMARY KEY (`experts_id`,`geoExpertise_id`),
  KEY `fk_experts_has_geoExpertise_geoExpertise1_idx` (`geoExpertise_id`),
  KEY `fk_experts_has_geoExpertise_experts1_idx` (`experts_id`),
  CONSTRAINT `fk_experts_has_geoExpertise_experts1` FOREIGN KEY (`experts_id`) REFERENCES `experts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_experts_has_geoExpertise_geoExpertise1` FOREIGN KEY (`geoExpertise_id`) REFERENCES `geoexpertise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experts_has_geoexpertise`
--

LOCK TABLES `experts_has_geoexpertise` WRITE;
/*!40000 ALTER TABLE `experts_has_geoexpertise` DISABLE KEYS */;
/*!40000 ALTER TABLE `experts_has_geoexpertise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experts_has_hcptype`
--

DROP TABLE IF EXISTS `experts_has_hcptype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experts_has_hcptype` (
  `experts_id` int NOT NULL,
  `hcpType_id` int NOT NULL,
  PRIMARY KEY (`experts_id`,`hcpType_id`),
  KEY `fk_experts_has_hcptype_hcptype1_idx` (`hcpType_id`),
  CONSTRAINT `fk_experts_has_hcptype_experts1` FOREIGN KEY (`experts_id`) REFERENCES `experts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_experts_has_hcptype_hcptype1` FOREIGN KEY (`hcpType_id`) REFERENCES `hcptype` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experts_has_hcptype`
--

LOCK TABLES `experts_has_hcptype` WRITE;
/*!40000 ALTER TABLE `experts_has_hcptype` DISABLE KEYS */;
/*!40000 ALTER TABLE `experts_has_hcptype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experts_has_industry`
--

DROP TABLE IF EXISTS `experts_has_industry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experts_has_industry` (
  `experts_id` int NOT NULL,
  `industry_id` int NOT NULL,
  PRIMARY KEY (`experts_id`,`industry_id`),
  KEY `fk_experts_has_industry_industry1_idx` (`industry_id`),
  KEY `fk_experts_has_industry_experts1_idx` (`experts_id`),
  CONSTRAINT `fk_experts_has_industry_experts1` FOREIGN KEY (`experts_id`) REFERENCES `experts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_experts_has_industry_industry1` FOREIGN KEY (`industry_id`) REFERENCES `industry` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experts_has_industry`
--

LOCK TABLES `experts_has_industry` WRITE;
/*!40000 ALTER TABLE `experts_has_industry` DISABLE KEYS */;
/*!40000 ALTER TABLE `experts_has_industry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experts_has_languages`
--

DROP TABLE IF EXISTS `experts_has_languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experts_has_languages` (
  `experts_id` int NOT NULL,
  `languages_id` int NOT NULL,
  PRIMARY KEY (`experts_id`,`languages_id`),
  KEY `fk_experts_has_languages_languages1_idx` (`languages_id`),
  KEY `fk_experts_has_languages_experts1_idx` (`experts_id`),
  CONSTRAINT `fk_experts_has_languages_experts1` FOREIGN KEY (`experts_id`) REFERENCES `experts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_experts_has_languages_languages1` FOREIGN KEY (`languages_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experts_has_languages`
--

LOCK TABLES `experts_has_languages` WRITE;
/*!40000 ALTER TABLE `experts_has_languages` DISABLE KEYS */;
/*!40000 ALTER TABLE `experts_has_languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experts_has_linkedinkeywords`
--

DROP TABLE IF EXISTS `experts_has_linkedinkeywords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experts_has_linkedinkeywords` (
  `experts_id` int NOT NULL,
  `linkedinKeywords_id` int NOT NULL,
  PRIMARY KEY (`experts_id`,`linkedinKeywords_id`),
  KEY `fk_experts_has_linkedinKeywords_linkedinKeywords1_idx` (`linkedinKeywords_id`),
  KEY `fk_experts_has_linkedinKeywords_experts1_idx` (`experts_id`),
  CONSTRAINT `fk_experts_has_linkedinKeywords_experts1` FOREIGN KEY (`experts_id`) REFERENCES `experts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_experts_has_linkedinKeywords_linkedinKeywords1` FOREIGN KEY (`linkedinKeywords_id`) REFERENCES `linkedinkeywords` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experts_has_linkedinkeywords`
--

LOCK TABLES `experts_has_linkedinkeywords` WRITE;
/*!40000 ALTER TABLE `experts_has_linkedinkeywords` DISABLE KEYS */;
/*!40000 ALTER TABLE `experts_has_linkedinkeywords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experts_has_projects`
--

DROP TABLE IF EXISTS `experts_has_projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experts_has_projects` (
  `experts_id` int NOT NULL,
  `projects_id` int NOT NULL,
  `answer` tinyint DEFAULT NULL,
  `preferedItwDay` varchar(255) DEFAULT NULL,
  `factuByExpert` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`experts_id`,`projects_id`),
  KEY `fk_experts_has_projects_projects1_idx` (`projects_id`),
  KEY `fk_experts_has_projects_experts1_idx` (`experts_id`),
  CONSTRAINT `fk_experts_has_projects_experts1` FOREIGN KEY (`experts_id`) REFERENCES `experts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_experts_has_projects_projects1` FOREIGN KEY (`projects_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experts_has_projects`
--

LOCK TABLES `experts_has_projects` WRITE;
/*!40000 ALTER TABLE `experts_has_projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `experts_has_projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experts_has_sector`
--

DROP TABLE IF EXISTS `experts_has_sector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experts_has_sector` (
  `experts_id` int NOT NULL,
  `sector_id` int NOT NULL,
  PRIMARY KEY (`experts_id`,`sector_id`),
  KEY `fk_experts_has_sector_sector1_idx` (`sector_id`),
  CONSTRAINT `fk_experts_has_sector_experts1` FOREIGN KEY (`experts_id`) REFERENCES `experts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_experts_has_sector_sector1` FOREIGN KEY (`sector_id`) REFERENCES `sector` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experts_has_sector`
--

LOCK TABLES `experts_has_sector` WRITE;
/*!40000 ALTER TABLE `experts_has_sector` DISABLE KEYS */;
/*!40000 ALTER TABLE `experts_has_sector` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experts_has_specialty`
--

DROP TABLE IF EXISTS `experts_has_specialty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experts_has_specialty` (
  `experts_id` int NOT NULL,
  `specialty_id` int NOT NULL,
  PRIMARY KEY (`experts_id`,`specialty_id`),
  KEY `fk_experts_has_specialty_specialty1_idx` (`specialty_id`),
  CONSTRAINT `fk_experts_has_specialty_experts1` FOREIGN KEY (`experts_id`) REFERENCES `experts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_experts_has_specialty_specialty1` FOREIGN KEY (`specialty_id`) REFERENCES `specialty` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experts_has_specialty`
--

LOCK TABLES `experts_has_specialty` WRITE;
/*!40000 ALTER TABLE `experts_has_specialty` DISABLE KEYS */;
/*!40000 ALTER TABLE `experts_has_specialty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbackexpert`
--

DROP TABLE IF EXISTS `feedbackexpert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedbackexpert` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbackexpert`
--

LOCK TABLES `feedbackexpert` WRITE;
/*!40000 ALTER TABLE `feedbackexpert` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedbackexpert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fonction`
--

DROP TABLE IF EXISTS `fonction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fonction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fonctionName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fonction`
--

LOCK TABLES `fonction` WRITE;
/*!40000 ALTER TABLE `fonction` DISABLE KEYS */;
INSERT INTO `fonction` VALUES (1,'manufacturing'),(2,'management'),(3,'marketing'),(4,'sales'),(11,'operations'),(12,'top management'),(13,'technical'),(14,'scientist'),(15,'bd'),(16,'corporate strategy');
/*!40000 ALTER TABLE `fonction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `geoexpertise`
--

DROP TABLE IF EXISTS `geoexpertise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `geoexpertise` (
  `id` int NOT NULL AUTO_INCREMENT,
  `geoExpertiseName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `geoexpertise`
--

LOCK TABLES `geoexpertise` WRITE;
/*!40000 ALTER TABLE `geoexpertise` DISABLE KEYS */;
/*!40000 ALTER TABLE `geoexpertise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hcptype`
--

DROP TABLE IF EXISTS `hcptype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hcptype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hcpTypeName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hcptype`
--

LOCK TABLES `hcptype` WRITE;
/*!40000 ALTER TABLE `hcptype` DISABLE KEYS */;
/*!40000 ALTER TABLE `hcptype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `industry`
--

DROP TABLE IF EXISTS `industry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `industry` (
  `id` int NOT NULL AUTO_INCREMENT,
  `industryName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industry`
--

LOCK TABLES `industry` WRITE;
/*!40000 ALTER TABLE `industry` DISABLE KEYS */;
INSERT INTO `industry` VALUES (1,'biotech'),(2,'pharma'),(3,'cdmo'),(4,'biopharma'),(6,'cro'),(7,'food supplements'),(8,'health care software services'),(9,'dental care'),(10,'api supplier');
/*!40000 ALTER TABLE `industry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobtitle`
--

DROP TABLE IF EXISTS `jobtitle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobtitle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jobTitleName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobtitle`
--

LOCK TABLES `jobtitle` WRITE;
/*!40000 ALTER TABLE `jobtitle` DISABLE KEYS */;
INSERT INTO `jobtitle` VALUES (1,'CXO'),(2,'VP'),(3,'Director'),(4,'Manager'),(5,'Lab Researcher'),(6,'Clinical Director'),(7,'Sourcing Expert'),(8,'Procurment Manager'),(9,'Scientist'),(10,'Chief Scientist Officer'),(11,'Industrial Operations'),(12,'Manufacturing Director'),(13,'Prosthesists'),(14,'Dantal Technician'),(15,'Dentist'),(16,'Immunologist'),(17,'Bioprocess Engineer'),(22,'CEO');
/*!40000 ALTER TABLE `jobtitle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kindofexpert`
--

DROP TABLE IF EXISTS `kindofexpert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kindofexpert` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kindOfExpertName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kindofexpert`
--

LOCK TABLES `kindofexpert` WRITE;
/*!40000 ALTER TABLE `kindofexpert` DISABLE KEYS */;
INSERT INTO `kindofexpert` VALUES (1,'industry expert'),(2,'research'),(3,'venture capitalist'),(4,'healthcare provider');
/*!40000 ALTER TABLE `kindofexpert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kindofexpert_has_projects`
--

DROP TABLE IF EXISTS `kindofexpert_has_projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kindofexpert_has_projects` (
  `kindOfExpert_id` int NOT NULL,
  `projects_id` int NOT NULL,
  PRIMARY KEY (`kindOfExpert_id`,`projects_id`),
  KEY `fk_kindOfExpert_has_projects_projects1_idx` (`projects_id`),
  KEY `fk_kindOfExpert_has_projects_kindOfExpert1_idx` (`kindOfExpert_id`),
  CONSTRAINT `fk_kindOfExpert_has_projects_kindOfExpert1` FOREIGN KEY (`kindOfExpert_id`) REFERENCES `kindofexpert` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_kindOfExpert_has_projects_projects1` FOREIGN KEY (`projects_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kindofexpert_has_projects`
--

LOCK TABLES `kindofexpert_has_projects` WRITE;
/*!40000 ALTER TABLE `kindofexpert_has_projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `kindofexpert_has_projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `languages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `languagesName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `languages_has_projects`
--

DROP TABLE IF EXISTS `languages_has_projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `languages_has_projects` (
  `languages_id` int NOT NULL,
  `projects_id` int NOT NULL,
  PRIMARY KEY (`languages_id`,`projects_id`),
  KEY `fk_languages_has_projects_projects1_idx` (`projects_id`),
  KEY `fk_languages_has_projects_languages1_idx` (`languages_id`),
  CONSTRAINT `fk_languages_has_projects_languages1` FOREIGN KEY (`languages_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_languages_has_projects_projects1` FOREIGN KEY (`projects_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages_has_projects`
--

LOCK TABLES `languages_has_projects` WRITE;
/*!40000 ALTER TABLE `languages_has_projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `languages_has_projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `linkedinkeywords`
--

DROP TABLE IF EXISTS `linkedinkeywords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `linkedinkeywords` (
  `id` int NOT NULL AUTO_INCREMENT,
  `linkedinKey` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linkedinkeywords`
--

LOCK TABLES `linkedinkeywords` WRITE;
/*!40000 ALTER TABLE `linkedinkeywords` DISABLE KEYS */;
/*!40000 ALTER TABLE `linkedinkeywords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `linkedinkeywords_has_projects`
--

DROP TABLE IF EXISTS `linkedinkeywords_has_projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `linkedinkeywords_has_projects` (
  `linkedinKeywords_id` int NOT NULL,
  `projects_id` int NOT NULL,
  PRIMARY KEY (`linkedinKeywords_id`,`projects_id`),
  KEY `fk_linkedinKeywords_has_projects_projects1_idx` (`projects_id`),
  KEY `fk_linkedinKeywords_has_projects_linkedinKeywords1_idx` (`linkedinKeywords_id`),
  CONSTRAINT `fk_linkedinKeywords_has_projects_linkedinKeywords1` FOREIGN KEY (`linkedinKeywords_id`) REFERENCES `linkedinkeywords` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_linkedinKeywords_has_projects_projects1` FOREIGN KEY (`projects_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linkedinkeywords_has_projects`
--

LOCK TABLES `linkedinkeywords_has_projects` WRITE;
/*!40000 ALTER TABLE `linkedinkeywords_has_projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `linkedinkeywords_has_projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `past_companies`
--

DROP TABLE IF EXISTS `past_companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `past_companies` (
  `experts_id` int NOT NULL,
  `pastCompany_id` int NOT NULL,
  PRIMARY KEY (`experts_id`,`pastCompany_id`),
  KEY `fk_experts_has_company_company1_idx` (`pastCompany_id`),
  KEY `fk_experts_has_company_experts1_idx` (`experts_id`),
  CONSTRAINT `fk_experts_has_company_company1` FOREIGN KEY (`pastCompany_id`) REFERENCES `company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_experts_has_company_experts1` FOREIGN KEY (`experts_id`) REFERENCES `experts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `past_companies`
--

LOCK TABLES `past_companies` WRITE;
/*!40000 ALTER TABLE `past_companies` DISABLE KEYS */;
/*!40000 ALTER TABLE `past_companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `practice`
--

DROP TABLE IF EXISTS `practice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `practice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `practiceType` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `practice`
--

LOCK TABLES `practice` WRITE;
/*!40000 ALTER TABLE `practice` DISABLE KEYS */;
INSERT INTO `practice` VALUES (1,'private'),(2,'public');
/*!40000 ALTER TABLE `practice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `itwStart` varchar(255) DEFAULT NULL,
  `itwDeadline` varchar(255) DEFAULT NULL,
  `projectTitle` varchar(255) DEFAULT NULL,
  `quantityExpert` int DEFAULT NULL,
  `clientComment` longtext,
  `totalPrice` int DEFAULT NULL,
  `numProject` varchar(255) DEFAULT NULL,
  `status_id` int NOT NULL,
  `expertiseLevel_id` int NOT NULL,
  `client_id` int NOT NULL,
  `projectType_id` int DEFAULT NULL,
  PRIMARY KEY (`id`,`status_id`,`expertiseLevel_id`,`client_id`),
  KEY `fk_projects_status1_idx` (`status_id`),
  KEY `fk_projects_expertiseLevel1_idx` (`expertiseLevel_id`),
  KEY `fk_projects_clients1_idx` (`client_id`),
  KEY `fk_projects_clients_idx` (`client_id`),
  KEY `fk_projects_client1_idx` (`client_id`),
  KEY `fk_projects_projecttype1_idx` (`projectType_id`),
  CONSTRAINT `fk_projects_clients1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_projects_expertiseLevel1` FOREIGN KEY (`expertiseLevel_id`) REFERENCES `expertiselevel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_projects_projecttype1` FOREIGN KEY (`projectType_id`) REFERENCES `projecttype` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_projects_status1` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects_exclude_company`
--

DROP TABLE IF EXISTS `projects_exclude_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects_exclude_company` (
  `company_id` int NOT NULL,
  `projects_id` int NOT NULL,
  PRIMARY KEY (`company_id`,`projects_id`),
  KEY `fk_company_has_projects_projects2_idx` (`projects_id`),
  KEY `fk_company_has_projects_company2_idx` (`company_id`),
  CONSTRAINT `fk_company_has_projects_company2` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_company_has_projects_projects2` FOREIGN KEY (`projects_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects_exclude_company`
--

LOCK TABLES `projects_exclude_company` WRITE;
/*!40000 ALTER TABLE `projects_exclude_company` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects_exclude_company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects_has_jobtitle`
--

DROP TABLE IF EXISTS `projects_has_jobtitle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects_has_jobtitle` (
  `projects_id` int NOT NULL,
  `jobTitle_id` int NOT NULL,
  PRIMARY KEY (`projects_id`,`jobTitle_id`),
  KEY `fk_projects_has_jobTitle_jobTitle1_idx` (`jobTitle_id`),
  KEY `fk_projects_has_jobTitle_projects1_idx` (`projects_id`),
  CONSTRAINT `fk_projects_has_jobTitle_jobTitle1` FOREIGN KEY (`jobTitle_id`) REFERENCES `jobtitle` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_projects_has_jobTitle_projects1` FOREIGN KEY (`projects_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects_has_jobtitle`
--

LOCK TABLES `projects_has_jobtitle` WRITE;
/*!40000 ALTER TABLE `projects_has_jobtitle` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects_has_jobtitle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects_has_practice`
--

DROP TABLE IF EXISTS `projects_has_practice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects_has_practice` (
  `practice_id` int NOT NULL,
  `projects_id` int NOT NULL,
  PRIMARY KEY (`practice_id`,`projects_id`),
  KEY `fk_projects_has_practice_practice1_idx` (`practice_id`),
  KEY `fk_projects_has_practice_projects1_idx` (`projects_id`),
  CONSTRAINT `fk_projects_has_practice_practice1` FOREIGN KEY (`practice_id`) REFERENCES `practice` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_projects_has_practice_projects1` FOREIGN KEY (`projects_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects_has_practice`
--

LOCK TABLES `projects_has_practice` WRITE;
/*!40000 ALTER TABLE `projects_has_practice` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects_has_practice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects_has_projecttype`
--

DROP TABLE IF EXISTS `projects_has_projecttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects_has_projecttype` (
  `projectType_id` int NOT NULL,
  `projects_id` int NOT NULL,
  PRIMARY KEY (`projectType_id`,`projects_id`),
  KEY `fk_projects_has_projectType_projectType1_idx` (`projectType_id`),
  KEY `fk_projects_has_projectType_projects1_idx` (`projects_id`),
  CONSTRAINT `fk_projects_has_projectType_projects1` FOREIGN KEY (`projects_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_projects_has_projectType_projectType1` FOREIGN KEY (`projectType_id`) REFERENCES `projecttype` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects_has_projecttype`
--

LOCK TABLES `projects_has_projecttype` WRITE;
/*!40000 ALTER TABLE `projects_has_projecttype` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects_has_projecttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects_need_fonction`
--

DROP TABLE IF EXISTS `projects_need_fonction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects_need_fonction` (
  `fonction_id` int NOT NULL,
  `projects_id` int NOT NULL,
  PRIMARY KEY (`fonction_id`,`projects_id`),
  KEY `fk_function_has_projects_projects1_idx` (`projects_id`),
  KEY `fk_function_has_projects_function1_idx` (`fonction_id`),
  CONSTRAINT `fk_function_has_projects_function1` FOREIGN KEY (`fonction_id`) REFERENCES `fonction` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_function_has_projects_projects1` FOREIGN KEY (`projects_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects_need_fonction`
--

LOCK TABLES `projects_need_fonction` WRITE;
/*!40000 ALTER TABLE `projects_need_fonction` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects_need_fonction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects_need_geoexpertise`
--

DROP TABLE IF EXISTS `projects_need_geoexpertise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects_need_geoexpertise` (
  `geoExpertise_id` int NOT NULL,
  `projects_id` int NOT NULL,
  PRIMARY KEY (`geoExpertise_id`,`projects_id`),
  KEY `fk_geoExpertise_has_projects_projects1_idx` (`projects_id`),
  KEY `fk_geoExpertise_has_projects_geoExpertise1_idx` (`geoExpertise_id`),
  CONSTRAINT `fk_geoExpertise_has_projects_geoExpertise1` FOREIGN KEY (`geoExpertise_id`) REFERENCES `geoexpertise` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_geoExpertise_has_projects_projects1` FOREIGN KEY (`projects_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects_need_geoexpertise`
--

LOCK TABLES `projects_need_geoexpertise` WRITE;
/*!40000 ALTER TABLE `projects_need_geoexpertise` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects_need_geoexpertise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects_need_industry`
--

DROP TABLE IF EXISTS `projects_need_industry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects_need_industry` (
  `industry_id` int NOT NULL,
  `projects_id` int NOT NULL,
  PRIMARY KEY (`industry_id`,`projects_id`),
  KEY `fk_industry_has_projects_projects1_idx` (`projects_id`),
  KEY `fk_industry_has_projects_industry1_idx` (`industry_id`),
  CONSTRAINT `fk_industry_has_projects_industry1` FOREIGN KEY (`industry_id`) REFERENCES `industry` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_industry_has_projects_projects1` FOREIGN KEY (`projects_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects_need_industry`
--

LOCK TABLES `projects_need_industry` WRITE;
/*!40000 ALTER TABLE `projects_need_industry` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects_need_industry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects_recommend_company`
--

DROP TABLE IF EXISTS `projects_recommend_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects_recommend_company` (
  `company_id` int NOT NULL,
  `projects_id` int NOT NULL,
  PRIMARY KEY (`company_id`,`projects_id`),
  KEY `fk_company_has_projects_projects1_idx` (`projects_id`),
  KEY `fk_company_has_projects_company1_idx` (`company_id`),
  CONSTRAINT `fk_company_has_projects_company1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_company_has_projects_projects1` FOREIGN KEY (`projects_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects_recommend_company`
--

LOCK TABLES `projects_recommend_company` WRITE;
/*!40000 ALTER TABLE `projects_recommend_company` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects_recommend_company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projecttype`
--

DROP TABLE IF EXISTS `projecttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projecttype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `projectTypeName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projecttype`
--

LOCK TABLES `projecttype` WRITE;
/*!40000 ALTER TABLE `projecttype` DISABLE KEYS */;
INSERT INTO `projecttype` VALUES (1,'due diligence'),(2,'corporate strategy'),(3,'scouting report'),(4,'market study'),(5,'scientific guidance');
/*!40000 ALTER TABLE `projecttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sector`
--

DROP TABLE IF EXISTS `sector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sector` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sectorName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sector`
--

LOCK TABLES `sector` WRITE;
/*!40000 ALTER TABLE `sector` DISABLE KEYS */;
/*!40000 ALTER TABLE `sector` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `serviceName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_has_projects`
--

DROP TABLE IF EXISTS `service_has_projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_has_projects` (
  `service_id` int NOT NULL,
  `projects_id` int NOT NULL,
  PRIMARY KEY (`service_id`,`projects_id`),
  KEY `fk_service_has_projects_projects1_idx` (`projects_id`),
  KEY `fk_service_has_projects_service1_idx` (`service_id`),
  CONSTRAINT `fk_service_has_projects_projects1` FOREIGN KEY (`projects_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_service_has_projects_service1` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_has_projects`
--

LOCK TABLES `service_has_projects` WRITE;
/*!40000 ALTER TABLE `service_has_projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `service_has_projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialty`
--

DROP TABLE IF EXISTS `specialty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialty` (
  `id` int NOT NULL AUTO_INCREMENT,
  `specialtyName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`,`specialtyName`),
  UNIQUE KEY `specialtyName_UNIQUE` (`specialtyName`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialty`
--

LOCK TABLES `specialty` WRITE;
/*!40000 ALTER TABLE `specialty` DISABLE KEYS */;
/*!40000 ALTER TABLE `specialty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Urgent'),(2,'Active'),(3,'Completed'),(4,'To be confirmed');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-31 17:59:06
