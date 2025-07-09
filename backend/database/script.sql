PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS competitions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date DATE
);

CREATE TABLE IF NOT EXISTS teams (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  competitions_id INTEGER NOT NULL,
  FOREIGN KEY (competitions_id) REFERENCES competitions(id)
);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT UNIQUE NOT NULL,
  login TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  gender TEXT,
  role TEXT
);

CREATE TABLE IF NOT EXISTS participants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  full_name TEXT UNIQUE NOT NULL,
  gender TEXT,
  teams_id INTEGER NOT NULL,
  teams_competitions_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (teams_id, teams_competitions_id) REFERENCES teams(id, competitions_id)
);

CREATE TABLE IF NOT EXISTS participants_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bib_number INTEGER,
  start_time TIME,
  finish_time TIME,
  checkpoints_visited INTEGER,
  total_time TIME,
  participants_id INTEGER NOT NULL,
  teams_id INTEGER NOT NULL,
  competitions_id INTEGER NOT NULL,
  position INTEGER NOT NULL,
  FOREIGN KEY (participants_id, teams_id, competitions_id) REFERENCES participants(id, teams_id, teams_competitions_id),
  FOREIGN KEY (teams_id, competitions_id) REFERENCES teams(id, competitions_id),
  FOREIGN KEY (competitions_id) REFERENCES competitions(id)
);

CREATE TABLE IF NOT EXISTS team_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  participants_results_id INTEGER NOT NULL,
  participants_results_participants_id INTEGER NOT NULL,
  participants_results_teams_id INTEGER NOT NULL,
  participants_results_competitions_id INTEGER NOT NULL,
  position INTEGER NOT NULL,
  FOREIGN KEY (participants_results_id, participants_results_participants_id, participants_results_teams_id, participants_results_competitions_id)
    REFERENCES participants_results(id, participants_id, teams_id, competitions_id)
);
