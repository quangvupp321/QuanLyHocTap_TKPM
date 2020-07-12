-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: qlht
-- ------------------------------------------------------
-- Server version	8.0.20

USE `qlht`;

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
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,'Thiết kế phần mềm',2),(2,'Phân tích yêu cầu phần mềm',2),(3,'Máy học',1),(4,'Phương pháp tính',0),(5,'Lý thuyết số',0),(6,'Nhập môn lập trình',0),(7,'Kỹ thuật lập tình',0),(8,'Lập trình ứng dụng web',2),(9,'Lập trình ứng dụng Java',2),(10,'Trí tuệ nhân tạo',1),(11,'An toàn và bảo mật HTTT',3),(12,'Hệ quản trị CSDL',3);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `deadline`
--

LOCK TABLES `deadline` WRITE;
/*!40000 ALTER TABLE `deadline` DISABLE KEYS */;
INSERT INTO `deadline` VALUES (1,1,'Làm database','TKPM','2020-07-12 00:00:00',NULL,0),(2,1,'Java chat','Java','2020-07-13 00:00:00','note note',0),(3,2,'Thiết kế ứng dụng web ','TKPM','2020-07-14 00:00:00',NULL,0),(4,2,'Vẽ usecase','PTQLYCPM','2020-07-14 00:00:00',NULL,1),(5,2,'Viết ứng dụng bằng C++','NMLT','2020-07-15 00:00:00','C++ app',1);
/*!40000 ALTER TABLE `deadline` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `major`
--

LOCK TABLES `major` WRITE;
/*!40000 ALTER TABLE `major` DISABLE KEYS */;
INSERT INTO `major` VALUES (0,'Chung'),(1,'Khoa học máy tính'),(2,'Kỹ thuật phần mềm'),(3,'Hệ thống thông tin'),(4,'Mạng máy tính và viễn thông');
/*!40000 ALTER TABLE `major` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `note`
--

LOCK TABLES `note` WRITE;
/*!40000 ALTER TABLE `note` DISABLE KEYS */;
INSERT INTO `note` VALUES (1,1,'first','TKPM','first note'),(2,2,'second','QLYCPM','second note'),(3,3,'third','Java','làm java chat '),(4,4,'abcsd','Web','làm web với JS');
/*!40000 ALTER TABLE `note` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `schoolyear`
--

LOCK TABLES `schoolyear` WRITE;
/*!40000 ALTER TABLE `schoolyear` DISABLE KEYS */;
INSERT INTO `schoolyear` VALUES (16,'2016 - 2017'),(17,'2017 - 2018'),(18,'2018 - 2019'),(19,'2019 - 2020');
/*!40000 ALTER TABLE `schoolyear` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `score`
--

LOCK TABLES `score` WRITE;
/*!40000 ALTER TABLE `score` DISABLE KEYS */;
INSERT INTO `score` VALUES (1,1,'GK',9,30),(2,1,'CK',9,70),(3,2,'GK',10,30),(4,2,'CK',10,70);
/*!40000 ALTER TABLE `score` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `study`
--

LOCK TABLES `study` WRITE;
/*!40000 ALTER TABLE `study` DISABLE KEYS */;
INSERT INTO `study` VALUES (1,17001,1,2,19),(2,17002,1,2,19),(3,17001,2,2,19),(4,17002,2,2,19),(5,18021,6,1,19),(6,19031,7,1,19),(7,16051,9,2,18);
/*!40000 ALTER TABLE `study` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (10000,'admin','admin','admin@gmail.com','$2b$10$ttqO.BtyfiDajFdCJM/HM.rhdX69qGxGugAHHqb75r6PKNTextv0K',0,NULL,1),(10001,'171001','Hồ Đình Minh','minh@gmail.com','123',2,2017,0),(10002,'17003','Quang Vũ','vu@gmail.com','123',2,2017,0),(10003,'18021','Nguyễn Văn A','a@gmail.com','123',0,2018,0),(10004,'19031','Trần Thị B','b@gmail.com','123',0,2019,0),(10005,'16051','Phan Văn C','c@gmail.com','123',1,2016,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-12 10:41:27
course