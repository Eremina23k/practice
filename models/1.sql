SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema practice
-- -----------------------------------------------------
-- DROP SCHEMA IF EXISTS `practice` ;

-- -----------------------------------------------------
-- Schema practice
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `practice` DEFAULT CHARACTER SET utf8mb4 ;
USE `practice` ;

-- -----------------------------------------------------
-- Table `practice`.`competitions`
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS `practice`.`competitions` ;

CREATE TABLE IF NOT EXISTS `practice`.`competitions` (
  `id` INT NOT NULL,
  `date` DATE NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `practice`.`teams`
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS `practice`.`teams` ;

CREATE TABLE IF NOT EXISTS `practice`.`teams` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `competitions_id` INT NOT NULL,
  PRIMARY KEY (`id`, `competitions_id`),
  INDEX `fk_teams_competitions1_idx` (`competitions_id` ASC) VISIBLE,
  CONSTRAINT `fk_teams_competitions1`
    FOREIGN KEY (`competitions_id`)
    REFERENCES `practice`.`competitions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `practice`.`users`
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS `practice`.`users` ;

CREATE TABLE IF NOT EXISTS `practice`.`users` (
  `id` INT NOT NULL,
  `full_name` VARCHAR(45) UNIQUE NOT NULL,
  `login` VARCHAR(45) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `gender` VARCHAR(45) NULL,
  `role` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
-- CREATE TABLE IF NOT EXISTS `practice`.`users` (
--   `id` INT NOT NULL,
--   `full_name` VARCHAR(45) NOT NULL,
--   `login` VARCHAR(45) NOT NULL,
--   `password` VARCHAR(255) NOT NULL,
--   `gender` VARCHAR(45) NULL,
--   `role` VARCHAR(45) NULL,
--   PRIMARY KEY (`id`),
--   UNIQUE KEY `unique_full_name` (`full_name`),
--   UNIQUE KEY `unique_login` (`login`)
-- ) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `practice`.`participants`
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS `practice`.`participants` ;

CREATE TABLE IF NOT EXISTS `practice`.`participants` (
  `id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `full_name` VARCHAR(45) UNIQUE NOT NULL,
  `gender` VARCHAR(45) NULL,
  `teams_id` INT NOT NULL,
  `teams_competitions_id` INT NOT NULL,
  PRIMARY KEY (`id`, `teams_id`, `teams_competitions_id`),
  INDEX `fk_participants_users1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_participants_teams1_idx` (`teams_id` ASC, `teams_competitions_id` ASC) VISIBLE,
  CONSTRAINT `fk_participants_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `practice`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_participants_teams1`
    FOREIGN KEY (`teams_id`, `teams_competitions_id`)
    REFERENCES `practice`.`teams` (`id`, `competitions_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `practice`.`participants_results`
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS `practice`.`participants_results` ;

CREATE TABLE IF NOT EXISTS `practice`.`participants_results` (
  `id` INT NOT NULL,
  `bib_number` INT NULL,
  `start_time` TIME NULL,
  `finish_time` TIME NULL,
  `checkpoints_visited` INT NULL,
  `total_time` TIME NULL,
  `participants_id` INT NOT NULL,
  `teams_id` INT NOT NULL,
  `competitions_id` INT NOT NULL,
  PRIMARY KEY (`id`, `participants_id`, `teams_id`, `competitions_id`),
  INDEX `fk_participants_results_participants_idx` (`participants_id` ASC) VISIBLE,
  INDEX `fk_participants_results_teams1_idx` (`teams_id` ASC) VISIBLE,
  INDEX `fk_participants_results_competitions1_idx` (`competitions_id` ASC) VISIBLE,
  CONSTRAINT `fk_participants_results_participants`
    FOREIGN KEY (`participants_id`)
    REFERENCES `practice`.`participants` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_participants_results_teams1`
    FOREIGN KEY (`teams_id`)
    REFERENCES `practice`.`teams` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_participants_results_competitions1`
    FOREIGN KEY (`competitions_id`)
    REFERENCES `practice`.`competitions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `practice`.`team_results`
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS `practice`.`team_results` ;

CREATE TABLE IF NOT EXISTS `practice`.`team_results` (
  `id` INT NOT NULL,
  `participants_results_id` INT NOT NULL,
  `participants_results_participants_id` INT NOT NULL,
  `participants_results_teams_id` INT NOT NULL,
  `participants_results_competitions_id` INT NOT NULL,
  PRIMARY KEY (`id`, `participants_results_id`, `participants_results_participants_id`, `participants_results_teams_id`, `participants_results_competitions_id`),
  INDEX `fk_team_results_participants_results1_idx` (`participants_results_id` ASC, `participants_results_participants_id` ASC, `participants_results_teams_id` ASC, `participants_results_competitions_id` ASC) VISIBLE,
  CONSTRAINT `fk_team_results_participants_results1`
    FOREIGN KEY (`participants_results_id` , `participants_results_participants_id` , `participants_results_teams_id` , `participants_results_competitions_id`)
    REFERENCES `practice`.`participants_results` (`id` , `participants_id` , `teams_id` , `competitions_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
