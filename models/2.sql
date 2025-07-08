-- Отключаем проверки
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


DROP SCHEMA IF EXISTS `practice` ;
-- Создание схемы
CREATE SCHEMA IF NOT EXISTS `practice` DEFAULT CHARACTER SET utf8mb4 ;
USE `practice` ;

-- Таблица competitions
CREATE TABLE IF NOT EXISTS `competitions` (
  `id` INT NOT NULL,
  `date` DATE NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- Таблица teams
CREATE TABLE IF NOT EXISTS `teams` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `competitions_id` INT NOT NULL,
  PRIMARY KEY (`id`, `competitions_id`),
  CONSTRAINT `fk_teams_competitions1`
    FOREIGN KEY (`competitions_id`)
    REFERENCES `competitions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Таблица users
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL,
  `full_name` VARCHAR(45) UNIQUE NOT NULL,
  `login` VARCHAR(45) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `gender` VARCHAR(45) NULL,
  `role` VARCHAR(45) NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- Таблица participants
CREATE TABLE IF NOT EXISTS `participants` (
  `id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `full_name` VARCHAR(45) UNIQUE NOT NULL,
  `gender` VARCHAR(45) NULL,
  `teams_id` INT NOT NULL,
  `teams_competitions_id` INT NOT NULL,
  PRIMARY KEY (`id`, `teams_id`, `teams_competitions_id`),
  CONSTRAINT `fk_participants_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_participants_teams1`
    FOREIGN KEY (`teams_id`, `teams_competitions_id`)
    REFERENCES `teams` (`id`, `competitions_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Таблица participants_results
CREATE TABLE IF NOT EXISTS `participants_results` (
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
  CONSTRAINT `fk_participants_results_participants`
    FOREIGN KEY (`participants_id`, `teams_id`, `competitions_id`)
    REFERENCES `participants` (`id`, `teams_id`, `teams_competitions_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_participants_results_teams1`
    FOREIGN KEY (`teams_id`, `competitions_id`)
    REFERENCES `teams` (`id`, `competitions_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_participants_results_competitions1`
    FOREIGN KEY (`competitions_id`)
    REFERENCES `competitions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Таблица team_results
CREATE TABLE IF NOT EXISTS `team_results` (
  `id` INT NOT NULL,
  `participants_results_id` INT NOT NULL,
  `participants_results_participants_id` INT NOT NULL,
  `participants_results_teams_id` INT NOT NULL,
  `participants_results_competitions_id` INT NOT NULL,
  PRIMARY KEY (`id`, `participants_results_id`, `participants_results_participants_id`, `participants_results_teams_id`, `participants_results_competitions_id`),
  CONSTRAINT `fk_team_results_participants_results1`
    FOREIGN KEY (`participants_results_id`, `participants_results_participants_id`, `participants_results_teams_id`, `participants_results_competitions_id`)
    REFERENCES `participants_results` (`id`, `participants_id`, `teams_id`, `competitions_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;


-- !!Несколько действий для проверки!! 
-- Вставка соревнований
INSERT INTO `competitions` (`id`, `date`)
VALUES 
(1, '2025-07-01'),
(2, '2025-08-15');

-- Вставка команд
INSERT INTO `teams` (`id`, `name`, `competitions_id`)
VALUES 
(10, 'Team Alpha', 1),
(11, 'Team Beta', 1),
(12, 'Team Gamma', 2);

-- Вставка пользователей
INSERT INTO `users` (`id`, `full_name`, `login`, `password`, `gender`, `role`)
VALUES 
(100, 'John Doe', 'jdoe', 'hashed_password1', 'Male', 'participant'),
(101, 'Jane Smith', 'jsmith', 'hashed_password2', 'Female', 'participant'),
(102, 'Alice Brown', 'abrown', 'hashed_password3', 'Female', 'participant'),
(103, 'Bob Johnson', 'bjohnson', 'hashed_password4', 'Male', 'participant');

-- Вставка участников
INSERT INTO `participants` (`id`, `user_id`, `full_name`, `gender`, `teams_id`, `teams_competitions_id`)
VALUES 
(1000, 100, 'John Doe', 'Male', 10, 1),
(1001, 101, 'Jane Smith', 'Female', 10, 1),
(1002, 102, 'Alice Brown', 'Female', 11, 1),
(1003, 103, 'Bob Johnson', 'Male', 12, 2);

-- Вставка результатов участников
INSERT INTO `participants_results` (`id`, `bib_number`, `start_time`, `finish_time`, `checkpoints_visited`, `total_time`,
  `participants_id`, `teams_id`, `competitions_id`)
VALUES 
(5000, 7, '10:00:00', '10:42:30', 1, '00:42:30', 1000, 10, 1),
(5001, 12, '10:05:00', '10:50:10', 3, '00:45:10', 1001, 10, 1),
(5002, 21, '10:10:00', '10:59:30', 5, '00:49:30', 1002, 11, 1),
(5003, 3, '11:00:00', '11:40:00', 0, '00:40:00', 1003, 12, 2);

-- Вставка итогов команды
INSERT INTO `team_results` (
  `id`, `participants_results_id`, `participants_results_participants_id`, `participants_results_teams_id`, `participants_results_competitions_id`
)
VALUES 
(9000, 5000, 1000, 10, 1),
(9001, 5001, 1001, 10, 1),
(9002, 5002, 1002, 11, 1),
(9003, 5003, 1003, 12, 2);

-- Проверка вывода таблицы team_results
SELECT 
  tr.id AS team_result_id,
  u.full_name AS participant_name,
  t.name AS team_name,
  c.date AS competition_date,
  pr.bib_number,
  pr.total_time
FROM team_results tr
JOIN participants_results pr 
  ON tr.participants_results_id = pr.id
  AND tr.participants_results_participants_id = pr.participants_id
  AND tr.participants_results_teams_id = pr.teams_id
  AND tr.participants_results_competitions_id = pr.competitions_id
JOIN participants p 
  ON pr.participants_id = p.id 
  AND pr.teams_id = p.teams_id 
  AND pr.competitions_id = p.teams_competitions_id
JOIN users u 
  ON p.user_id = u.id
JOIN teams t 
  ON pr.teams_id = t.id 
  AND pr.competitions_id = t.competitions_id
JOIN competitions c 
  ON pr.competitions_id = c.id
ORDER BY tr.id;


-- Проверка вывода таблицы participants_results
SELECT
  pr.id AS result_id,
  u.full_name AS participant_name,
  t.name AS team_name,
  c.date AS competition_date,
  pr.bib_number,
  pr.start_time,
  pr.finish_time,
  pr.checkpoints_visited,
  pr.total_time
FROM participants_results pr
JOIN participants p
  ON pr.participants_id = p.id
  AND pr.teams_id = p.teams_id
  AND pr.competitions_id = p.teams_competitions_id
JOIN users u
  ON p.user_id = u.id
JOIN teams t
  ON pr.teams_id = t.id
  AND pr.competitions_id = t.competitions_id
JOIN competitions c
  ON pr.competitions_id = c.id
ORDER BY pr.id
LIMIT 0, 1000;


-- Проверка связей: Вывод всех участников с командами и пользователями
SELECT 
  p.id AS participant_id,
  u.full_name AS user_name,
  t.name AS team_name,
  c.date AS competition_date
FROM participants p
JOIN users u ON p.user_id = u.id
JOIN teams t ON p.teams_id = t.id AND p.teams_competitions_id = t.competitions_id
JOIN competitions c ON t.competitions_id = c.id;

-- Проверка результата участника
SELECT 
  pr.id AS result_id,
  u.full_name,
  pr.start_time,
  pr.finish_time,
  pr.total_time
FROM participants_results pr
JOIN participants p ON pr.participants_id = p.id AND pr.teams_id = p.teams_id AND pr.competitions_id = p.teams_competitions_id
JOIN users u ON p.user_id = u.id;

-- Проверка итогов команды
SELECT 
  tr.id AS team_result_id,
  pr.id AS result_id,
  u.full_name,
  pr.total_time
FROM team_results tr
JOIN participants_results pr 
  ON tr.participants_results_id = pr.id 
  AND tr.participants_results_participants_id = pr.participants_id
  AND tr.participants_results_teams_id = pr.teams_id
  AND tr.participants_results_competitions_id = pr.competitions_id
JOIN participants p 
  ON pr.participants_id = p.id AND pr.teams_id = p.teams_id AND pr.competitions_id = p.teams_competitions_id
JOIN users u ON p.user_id = u.id;

-- Получить все результаты конкретного участника по имени
SELECT 
  u.full_name,
  c.date AS competition_date,
  t.name AS team_name,
  pr.bib_number,
  pr.start_time,
  pr.finish_time,
  pr.total_time
FROM participants_results pr
JOIN participants p ON pr.participants_id = p.id AND pr.teams_id = p.teams_id AND pr.competitions_id = p.teams_competitions_id
JOIN users u ON p.user_id = u.id
JOIN teams t ON pr.teams_id = t.id AND pr.competitions_id = t.competitions_id
JOIN competitions c ON pr.competitions_id = c.id
WHERE u.full_name = 'John Doe'
ORDER BY c.date;

-- Вывести среднее время прохождения участниками
SELECT 
  u.full_name,
  SEC_TO_TIME(AVG(TIME_TO_SEC(pr.total_time))) AS avg_total_time
FROM participants_results pr
JOIN participants p ON pr.participants_id = p.id AND pr.teams_id = p.teams_id AND pr.competitions_id = p.teams_competitions_id
JOIN users u ON p.user_id = u.id
GROUP BY u.full_name
ORDER BY avg_total_time;

-- Количество участников в каждой команде
SELECT 
  t.name AS team_name,
  COUNT(*) AS participant_count
FROM participants p
JOIN teams t ON p.teams_id = t.id AND p.teams_competitions_id = t.competitions_id
GROUP BY t.name
ORDER BY participant_count DESC;

-- Все результаты команды по ID соревнования
SELECT 
  t.name AS team_name,
  u.full_name AS participant,
  pr.total_time
FROM participants_results pr
JOIN participants p ON pr.participants_id = p.id AND pr.teams_id = p.teams_id AND pr.competitions_id = p.teams_competitions_id
JOIN users u ON p.user_id = u.id
JOIN teams t ON pr.teams_id = t.id AND pr.competitions_id = t.competitions_id
WHERE pr.competitions_id = 1
ORDER BY t.name, pr.total_time;






-- Восстановление параметров
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
