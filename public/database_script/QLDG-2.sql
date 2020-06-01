DROP DATABASE `qldg`;	
-- MySQL Workbench Forward Engineering
-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema qldg
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema qldg
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `qldg` DEFAULT CHARACTER SET utf8 ;
USE `qldg` ;

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Table `qldg`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qldg`.`category`(
  `CategoryID` INT(11) NOT NULL auto_increment,
  `CatName` NVARCHAR(50) NOT NULL,
  PRIMARY KEY (`CategoryID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qldg`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qldg`.`User_` (
  `f_userID` INT(11) NOT NULL AUTO_INCREMENT,
  `f_fullname` NVARCHAR(50) NOT NULL,
  `f_username` NVARCHAR(50) NOT NULL,
  `f_email` NVARCHAR(255) NULL DEFAULT NULL,
  `f_password` NVARCHAR(75) NOT NULL,
  `f_birth` TIMESTAMP NULL DEFAULT NULL,
  `f_address` NVARCHAR(45) NULL DEFAULT NULL,
  `f_rating` INT(11) NULL DEFAULT NULL,
  `f_permission` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`f_userID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qldg`.`subcategory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qldg`.`subcategory` (
  `SubCatID` INT(11) NOT NULL auto_increment,
  `SubCateName` NVARCHAR(50) NULL DEFAULT NULL,
  `categoryID` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`SubCatID`),
  INDEX `FK_CATID` (`categoryID` ASC) VISIBLE,
  CONSTRAINT `FK_CATID`
    FOREIGN KEY (`categoryID`)
    REFERENCES `qldg`.`category` (`CategoryID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `qldg`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qldg`.`products` (
  `ProID` INT(11) NOT NULL AUTO_INCREMENT,
  `ProName` NVARCHAR(70) NULL DEFAULT NULL,
  `Price` INT(11) NULL DEFAULT NULL,
  `SellerID` INT(11) NULL DEFAULT NULL,
  `SubCatID` INT(11) NULL DEFAULT NULL,
  `Rating` INT(11) NULL DEFAULT NULL,
  `CeilPrice` INT(11) NULL DEFAULT NULL,
  `IncreasePrice` INT(11) NULL DEFAULT '10',
  `AutoIncreaseTime` TINYINT(4) NULL DEFAULT '0',
  `Description` nvarchar(400) NULL DEFAULT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `end_time` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`ProID`),
  INDEX `FK_CATEGORYID` (`SubCatID` ASC) VISIBLE,
  INDEX `FK_SELLERID` (`SellerID` ASC) VISIBLE,
  CONSTRAINT `FK_SELLERID`
    FOREIGN KEY (`SellerID`)
    REFERENCES `qldg`.`User_` (`f_userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT `FK_CATEGORYID`
    FOREIGN KEY (`SubCatID`)
    REFERENCES `qldg`.`subcategory` (`SubCatID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qldg`.`description`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qldg`.`description` (
  `ProID` INT(11) NOT NULL,
  `FullDes` NVARCHAR(255) NULL DEFAULT NULL,
  `DateAdd` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ProID`),
  CONSTRAINT `FK_PROID_PROID`
    FOREIGN KEY (`ProID`)
    REFERENCES `qldg`.`products` (`ProID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qldg`.`ordersdetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qldg`.`ordersdetails` (
  `OrderID` INT(11) NOT NULL AUTO_INCREMENT,
  `ProID` INT(11) NOT NULL DEFAULT 1,
  `PriceOrdered` INT(11) NULL DEFAULT NULL,
  `OrderDate` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `IsSuccess` TINYINT(4) NULL DEFAULT '0',
  `SellerID` INT(11) NULL DEFAULT NULL,
  `BidderID` INT NULL,
  PRIMARY KEY (`OrderID`),
  INDEX `FK_ORDER` (`SellerID` ASC, `ProID` ASC) VISIBLE,
  CONSTRAINT `FK_ORDER`
    FOREIGN KEY (`SellerID` , `ProID`)
    REFERENCES `qldg`.`products` (`SellerID` , `ProID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qldg`.`promotion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qldg`.`promotion` (
  `PromoteID` INT(11) NOT NULL AUTO_INCREMENT,
  `Time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `UserID` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`PromoteID`)
--  INDEX `FK_TIMEPROMOTE` (`TimeID` ASC) VISIBLE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qldg`.`refuselist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qldg`.`refuselist` (
  `RefuseListID` INT(11) NOT NULL AUTO_INCREMENT,
  `ProID` INT(11) NULL DEFAULT NULL,
  `BidderID` INT(11) NULL DEFAULT NULL,
  `OrderID` INT NULL,
  PRIMARY KEY (`RefuseListID`)
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qldg`.`review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qldg`.`review` (
  `ReviewID` INT(11) NOT NULL AUTO_INCREMENT,
  `OrderID` INT(11) NULL DEFAULT NULL,
  `Review` NVARCHAR(255) NULL DEFAULT NULL,
  `Like` TINYINT(4) NULL DEFAULT '0',
  `SendID` INT(11) NULL DEFAULT NULL,
  `ReciveID` INT(11) NULL DEFAULT NULL,
  `TypeSend` TINYINT(4) NULL DEFAULT NULL,
  PRIMARY KEY (`ReviewID`),
  INDEX `FK_REVIEW` (`OrderID` ASC) VISIBLE,
  CONSTRAINT `FK_REVIEW`
    FOREIGN KEY (`OrderID`)
    REFERENCES `qldg`.`ordersdetails` (`OrderID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `qldg`.`watchlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `qldg`.`watchlist` (
  `WatchListID` INT(11) NOT NULL AUTO_INCREMENT,
  `ProID` INT(11) NULL DEFAULT NULL,
  `UserID` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`WatchListID`)
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ------------------------
ALTER TABLE refuselist ADD CONSTRAINT `FK_REFUSEUSER` FOREIGN KEY (`OrderID`) REFERENCES `qldg`.`ordersdetails` (`OrderID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

-- chỉ mục (cho search)
ALTER TABLE products  ADD FULLTEXT (ProName, Description);
ALTER TABLE subcategory  ADD FULLTEXT (SubCateName);
ALTER TABLE category  ADD FULLTEXT (CatName);
ALTER TABLE products  ADD FULLTEXT (ProName);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
