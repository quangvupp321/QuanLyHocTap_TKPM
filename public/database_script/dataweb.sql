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
INSERT INTO `course` VALUES (1,'Thiết kế phần mềm',2,4),(2,'Phân tích yêu cầu phần mềm',2,4),(3,'Nhập môn học máy',1,4),(4,'Phương pháp tính',0,4),(5,'Lý thuyết số',0,4),(6,'Nhập môn lập trình',0,4),(7,'Kỹ thuật lập tình',0,4),(8,'Lập trình ứng dụng web',2,4),(9,'Lập trình ứng dụng Java',2,4),(10,'Cơ sở trí tuệ nhân tạo',1,4),(11,'An toàn và bảo mật HTTT',3,4),(12,'Hệ quản trị CSDL',3,4);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `deadline`
--

LOCK TABLES `deadline` WRITE;
/*!40000 ALTER TABLE `deadline` DISABLE KEYS */;
INSERT INTO `deadline` VALUES (1,10000,'Làm database','TKPM','2020-07-12 00:00:00','<ul><li>Bài 1/trang 2</li><li>Bài 2/trang 7</li><li>Bài 3/trang 9</li></ul>',0),(2,10000,'Java chat','Java','2020-07-13 00:00:00','note note',0),(3,10006,'Thiết kế ứng dụng web ','TKPM','2020-07-14 00:00:00',NULL,0),(4,10006,'Vẽ usecase','PTQLYCPM','2020-07-14 00:00:00',NULL,1),(5,10006,'Viết ứng dụng bằng C++','NMLT','2020-07-15 00:00:00','C++ app',1),(6,10000,'Thiet ke phan mem','tkpm','2020-09-03 00:00:00','<ul><li>A</li><li>B</li><li>C</li></ul>',0),(7,10000,'Viet bao cao','tkpm','2020-09-02 00:00:00','các báo cáo từ 1-8',1);
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
INSERT INTO `note` VALUES (1,10000,'thi cuoi ki','TKPM','<h2>The three greatest things you learn from traveling</h2><p>Like all the great things on earth traveling teaches us by example. Here are some of the most precious lessons I’ve learned over the years of traveling.</p><h3>Appreciation of diversity</h3><p>Getting used to an entirely different culture can be challenging. While it’s also nice to learn about cultures online or from books, nothing comes close to experiencing <a href="https://en.wikipedia.org/wiki/Cultural_diversity">cultural diversity</a> in person. You learn to appreciate each and every single one of the differences while you become more culturally fluid.</p><h3>Confidence</h3><p>Going to a new place can be quite terrifying. While change and uncertainty makes us scared, traveling teaches us how ridiculous it is to be afraid of something before it happens. The moment you face your fear and see there was nothing to be afraid of, is the moment you discover bliss.</p>'),(2,10000,'bai tap','java','bai tap: yeu cau lam ro rang'),(3,10006,'third','Java','làm java chat '),(4,10006,'abcsd','Web','làm web với JS');
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
INSERT INTO `score` VALUES (1,1,'GK',9,30),(2,1,'CK',9,70),(3,2,'GK',10,30),(4,2,'CK',10,70),(5,5,'CK',7,100);
/*!40000 ALTER TABLE `score` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `study`
--

LOCK TABLES `study` WRITE;
/*!40000 ALTER TABLE `study` DISABLE KEYS */;
INSERT INTO `study` VALUES (1,10000,1,2,19, 0),(2,10006,1,2,19, 0),(3,10000,2,2,19, 0),(4,10006,2,2,19, 0),(5,10000,6,1,19,1),(6,10006,7,1,19, 0),(7,10006,9,2,18, 0);
/*!40000 ALTER TABLE `study` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (10000,'admin','admin','admin@gmail.com','$2b$10$ttqO.BtyfiDajFdCJM/HM.rhdX69qGxGugAHHqb75r6PKNTextv0K',0,2016,1),(10001,'171001','Hồ Đình Minh','minh@gmail.com','123',2,2017,0),(10002,'17003','Quang Vũ','vu@gmail.com','123',2,2017,0),(10003,'18021','Nguyễn Văn A','a@gmail.com','123',0,2018,0),(10004,'19031','Trần Thị B','b@gmail.com','123',0,2019,0),(10005,'16051','Phan Văn C','c@gmail.com','123',1,2016,0),(10006,'user','user','user@gmail.com','$2b$10$ttqO.BtyfiDajFdCJM/HM.rhdX69qGxGugAHHqb75r6PKNTextv0K',2,2017,0);
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