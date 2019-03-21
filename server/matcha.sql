-- MySQL Script generated by MySQL Workbench
-- Thu Mar 21 11:53:17 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema matcha
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema matcha
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `matcha` DEFAULT CHARACTER SET utf8 ;
USE `matcha` ;

-- -----------------------------------------------------
-- Table `matcha`.`genre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `matcha`.`genres` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `matcha`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `matcha`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `surname` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `bio` LONGTEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `genre_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  INDEX `fk_users_genre1_idx` (`genre_id` ASC),
  CONSTRAINT `fk_users_genre1`
    FOREIGN KEY (`genre_id`)
    REFERENCES `matcha`.`genre` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `matcha`.`tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `matcha`.`tags` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `matcha`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `matcha`.`images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `path` VARCHAR(45) NOT NULL,
  `is_profile` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `matcha`.`users_has_visited_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `matcha`.`users_has_visited_users` (
  `visitor_id` INT NOT NULL,
  `visited_id` INT NOT NULL,
  `visited_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`visitor_id`, `visited_id`),
  INDEX `fk_users_has_users_users1_idx` (`visited_id` ASC),
  INDEX `fk_users_has_users_users_idx` (`visitor_id` ASC),
  CONSTRAINT `fk_users_has_users_users`
    FOREIGN KEY (`visitor_id`)
    REFERENCES `matcha`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_users_users1`
    FOREIGN KEY (`visited_id`)
    REFERENCES `matcha`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `matcha`.`users_has_tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `matcha`.`users_has_tags` (
  `users_id` INT NOT NULL,
  `tags_id` INT NOT NULL,
  PRIMARY KEY (`users_id`, `tags_id`),
  INDEX `fk_users_has_tags_tags1_idx` (`tags_id` ASC),
  INDEX `fk_users_has_tags_users1_idx` (`users_id` ASC),
  CONSTRAINT `fk_users_has_tags_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `matcha`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_tags_tags1`
    FOREIGN KEY (`tags_id`)
    REFERENCES `matcha`.`tags` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `matcha`.`users_has_images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `matcha`.`users_has_images` (
  `users_id` INT NOT NULL,
  `images_id` INT NOT NULL,
  PRIMARY KEY (`users_id`, `images_id`),
  INDEX `fk_users_has_images_images1_idx` (`images_id` ASC),
  INDEX `fk_users_has_images_users1_idx` (`users_id` ASC),
  CONSTRAINT `fk_users_has_images_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `matcha`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_images_images1`
    FOREIGN KEY (`images_id`)
    REFERENCES `matcha`.`images` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `matcha`.`users_has_liked_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `matcha`.`users_has_liked_users` (
  `liker_id` INT NOT NULL,
  `liked_id` INT NOT NULL,
  `liked_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`liker_id`, `liked_id`),
  INDEX `fk_users_has_users_users3_idx` (`liked_id` ASC),
  INDEX `fk_users_has_users_users2_idx` (`liker_id` ASC),
  CONSTRAINT `fk_users_has_users_users2`
    FOREIGN KEY (`liker_id`)
    REFERENCES `matcha`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_users_users3`
    FOREIGN KEY (`liked_id`)
    REFERENCES `matcha`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
