-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: btht
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'test@test.com','9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08','9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'),(2,'test2@test.com','60303ae22b998861bce3b28f33eec1be758a213c86c93c076dbe9f558c11c752','60303ae22b998861bce3b28f33eec1be758a213c86c93c076dbe9f558c11c752'),(3,'test3@test.com','fd61a03af4f77d870fc21e05e7e80678095c92d808cfb3b5c279ee04c74aca13','fd61a03af4f77d870fc21e05e7e80678095c92d808cfb3b5c279ee04c74aca13');
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (6,'John','DOE','john.doe@webmail.com','0235148759','Brooklyn','Needs some dkfjdkj dkdjk dldl dkjd dld djd ldjd difjdi fms fosjfis felke.','CL01',7,17),(7,'Dan','MILLER','dan.miller@gmail.com','4851614785','London','jfdkjdfsjkfds dlsqkjkdfs dfskdsfqj dfskdfk fdsjdf fdmlkfdjfd dfkjfd fdskdf.','CL02',8,18),(8,'Edith','WRIGHT','edith.wright@mail.fr','6532154512','Paris','nfdjjjdbnnfd kdqsjkfd kfdj dflkmj fdjldf fdjfd ldfkj fd fdjkfdifdjfd lfdkj dfifd fdlkjdf dfifd flzmjeqakj am akldfj am jfdmlkqdfji ama fmkaj dfij fma kejf emlkjf i mk.','CL03',9,19);
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
INSERT INTO `clients_has_contacttype` VALUES (7,1),(6,2),(7,2),(6,3),(8,4),(6,6),(8,7);
/*!40000 ALTER TABLE `clients_has_contacttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients_has_fonction`
--

DROP TABLE IF EXISTS `clients_has_fonction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients_has_fonction` (
  `clients_id` int NOT NULL,
  `fonction_id` int NOT NULL,
  PRIMARY KEY (`clients_id`,`fonction_id`),
  KEY `fk_clients_has_fonction_fonction1_idx` (`fonction_id`),
  CONSTRAINT `fk_clients_has_fonction_clients1` FOREIGN KEY (`clients_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_clients_has_fonction_fonction1` FOREIGN KEY (`fonction_id`) REFERENCES `fonction` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients_has_fonction`
--

LOCK TABLES `clients_has_fonction` WRITE;
/*!40000 ALTER TABLE `clients_has_fonction` DISABLE KEYS */;
INSERT INTO `clients_has_fonction` VALUES (6,1),(6,2),(7,4),(7,11),(6,14),(8,15),(8,16);
/*!40000 ALTER TABLE `clients_has_fonction` ENABLE KEYS */;
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
INSERT INTO `clients_has_service` VALUES (6,6),(8,6),(7,7),(8,7);
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (17,'EDF'),(18,'Biotech'),(19,'Biomarché'),(20,'TechIndustry'),(21,'Dent');
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companytype`
--

LOCK TABLES `companytype` WRITE;
/*!40000 ALTER TABLE `companytype` DISABLE KEYS */;
INSERT INTO `companytype` VALUES (7,'Pharma'),(8,'Market'),(9,'Sale');
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
  `feedbackExpert` longtext,
  `cost` int DEFAULT NULL,
  `keywords` varchar(255) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experts`
--

LOCK TABLES `experts` WRITE;
/*!40000 ALTER TABLE `experts` DISABLE KEYS */;
INSERT INTO `experts` VALUES (28,'Bryan','LOFFY','bryan.loffy@webmail.com','6532124587',20,'www.linkedin.com/in/bryan-loffy',500,'EX01',4,2,3,'jdskjfdsifn fdmkjfdk fdsifd fdlkfdj fsdifds.',200,'doc, pharma',7),(29,'Kengo','TANAKA','tanaka.kengo@mail.jp','0214541154',20,'www.linkedin.com/in/tanaka-kengo',700,'EX02',3,1,1,'fgdjkjvwcx jmjwcxvk.',500,'japan, management',8),(30,'Jean','DUPONT','jean.dupont@mail.fr','0354216859',21,'www.linkedin.com/in/jean-dupont',900,'EX03',2,2,3,'dsfqfhejk jdfhjfd jj.',300,'none',6),(31,'Dave','LONG','dave.long@webmail.com','800770450',19,'www.linkedin.com/in/dave-long',900,'EX04',1,1,2,'sdfjkhhjdfsj',400,'none',8);
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
INSERT INTO `experts_has_contacttype` VALUES (29,1),(31,1),(29,3),(31,3),(30,4),(29,5),(31,5),(30,6),(28,7),(29,7);
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
INSERT INTO `experts_has_fonction` VALUES (29,4),(28,12),(31,12),(28,13),(29,13),(30,15);
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
INSERT INTO `experts_has_geoexpertise` VALUES (28,18),(29,18),(30,19),(31,21);
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
INSERT INTO `experts_has_hcptype` VALUES (28,8),(29,9),(30,9),(31,9);
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
INSERT INTO `experts_has_industry` VALUES (28,3),(29,4),(28,6),(31,7),(29,8),(31,8),(28,9),(29,9),(30,9),(31,10);
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
INSERT INTO `experts_has_languages` VALUES (28,9),(30,9),(28,10),(29,12),(29,13),(31,13);
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
INSERT INTO `experts_has_projects` VALUES (28,36,1,'2022/03/12','300'),(28,38,0,'2020/12/31','500'),(29,37,1,'2022/03/21','500'),(30,37,NULL,NULL,NULL),(30,38,1,'2022/09/30','300');
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
INSERT INTO `experts_has_sector` VALUES (28,8),(29,9),(30,9),(31,9);
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
INSERT INTO `experts_has_specialty` VALUES (28,14),(29,15),(30,15),(31,15);
/*!40000 ALTER TABLE `experts_has_specialty` ENABLE KEYS */;
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
INSERT INTO `fonction` VALUES (1,'Manufacturing'),(2,'Management'),(3,'Marketing'),(4,'Sales'),(11,'Operations'),(12,'Top Management'),(13,'Technical'),(14,'Scientist'),(15,'BD'),(16,'Corporate Strategy');
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `geoexpertise`
--

LOCK TABLES `geoexpertise` WRITE;
/*!40000 ALTER TABLE `geoexpertise` DISABLE KEYS */;
INSERT INTO `geoexpertise` VALUES (18,'Germany'),(19,'France'),(21,'China'),(22,'Japan');
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hcptype`
--

LOCK TABLES `hcptype` WRITE;
/*!40000 ALTER TABLE `hcptype` DISABLE KEYS */;
INSERT INTO `hcptype` VALUES (8,'Medical Affairs'),(9,'None');
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
INSERT INTO `industry` VALUES (1,'Biotech'),(2,'Pharma'),(3,'CDMO'),(4,'Biopharma'),(6,'CRO'),(7,'Food Supplements'),(8,'Health Care Software Services'),(9,'Dental Care'),(10,'Api Supplier');
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
INSERT INTO `kindofexpert` VALUES (1,'Industry Expert'),(2,'Research'),(3,'Venture Capitalist'),(4,'Healthcare Provider');
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
INSERT INTO `kindofexpert_has_projects` VALUES (4,36),(1,37),(2,37),(1,38);
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
INSERT INTO `languages` VALUES (9,'French'),(10,'English'),(12,'Chinese'),(13,'Japanese');
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
INSERT INTO `languages_has_projects` VALUES (9,36),(12,37),(13,37),(12,38);
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linkedinkeywords`
--

LOCK TABLES `linkedinkeywords` WRITE;
/*!40000 ALTER TABLE `linkedinkeywords` DISABLE KEYS */;
INSERT INTO `linkedinkeywords` VALUES (15,'Bio');
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
INSERT INTO `linkedinkeywords_has_projects` VALUES (15,36),(15,37),(15,38);
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
INSERT INTO `past_companies` VALUES (28,17),(29,17),(28,18),(29,18),(30,18),(29,19),(29,20),(31,20),(31,21);
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
INSERT INTO `practice` VALUES (1,'Private'),(2,'Public');
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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (36,'2022/02/01','2022/03/15','Leading blablabla',1,'jfdfi fdskjfdq fdifd qfmlkjfd qfidfq sdmflkjf qsdmkj kdfj.',500,'PJT01',1,2,6,2),(37,'2022/03/02','2022/04/27','Title 02',2,'fjkdsfjqdslj fijfqdjdf fdkj fifdj fdskjfds.',800,'PJT02',2,4,8,5),(38,'2022/09/12','2022/12/12','Project title 3',2,'dsqfmldsjqflkmjsdf',800,'PJT03',3,2,7,4);
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
INSERT INTO `projects_exclude_company` VALUES (17,36),(19,36),(19,37),(20,37),(21,38);
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
INSERT INTO `projects_has_jobtitle` VALUES (36,5),(38,5),(36,6),(37,6),(38,6),(36,7),(36,8),(37,8),(38,8),(37,9),(36,10);
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
INSERT INTO `projects_has_practice` VALUES (1,36),(1,37),(2,37),(2,38);
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
INSERT INTO `projects_need_fonction` VALUES (4,36),(11,37),(13,37),(3,38),(4,38),(11,38),(12,38);
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
INSERT INTO `projects_need_geoexpertise` VALUES (18,36),(19,36),(19,37),(21,37),(22,37),(21,38);
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
INSERT INTO `projects_need_industry` VALUES (3,36),(7,36),(6,37),(7,37),(10,37),(3,38),(6,38),(7,38);
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
INSERT INTO `projects_recommend_company` VALUES (19,36),(20,37),(17,38),(20,38);
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
INSERT INTO `projecttype` VALUES (1,'Due diligence'),(2,'Corporate Strategy'),(3,'Scouting Report'),(4,'Market Study'),(5,'Scientific Guidance');
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sector`
--

LOCK TABLES `sector` WRITE;
/*!40000 ALTER TABLE `sector` DISABLE KEYS */;
INSERT INTO `sector` VALUES (8,'Clinics'),(9,'None');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (6,'1h Call'),(7,'Conference');
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
INSERT INTO `service_has_projects` VALUES (6,36),(7,36),(7,37),(6,38),(7,38);
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialty`
--

LOCK TABLES `specialty` WRITE;
/*!40000 ALTER TABLE `specialty` DISABLE KEYS */;
INSERT INTO `specialty` VALUES (14,'Biotech'),(15,'None');
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

-- Dump completed on 2022-03-31 21:16:14
