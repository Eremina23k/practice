import sqlite3
import os

BASE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)))
db_path = os.path.join(BASE_DIR,'database', 'CompetitionDB.bd')

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# try:
#     # 1. Добавим соревнование
#     cursor.execute("INSERT INTO competitions (date) VALUES (?)", ('2025-07-01',))
#     competition_id = cursor.lastrowid

#     # 2. Команды
#     cursor.execute("INSERT INTO teams (name, competitions_id) VALUES (?, ?)", ('Team Alpha', competition_id))
#     team_id = cursor.lastrowid

#     # 3. Пользователь
#     cursor.execute("""
#         INSERT INTO users (full_name, login, password, gender, role)
#         VALUES (?, ?, ?, ?, ?)
#     """, ('Иван Иванов', 'ivan', '1234', 'male', 'participant'))
#     user_id = cursor.lastrowid

#     # 4. Участник (связь с users и teams)
#     cursor.execute("""
#         INSERT INTO participants (user_id, full_name, gender, teams_id, teams_competitions_id)
#         VALUES (?, ?, ?, ?, ?)
#     """, (user_id, 'Иван Иванов', 'male', team_id, competition_id))
#     participant_id = cursor.lastrowid

#     # 5. Результаты участника
#     cursor.execute("""
#         INSERT INTO participants_results (
#             bib_number, start_time, finish_time, checkpoints_visited,
#             total_time, participants_id, teams_id, competitions_id, position
#         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
#     """, (
#         101, '10:00:00', '10:45:00', 5, '00:45:00',
#         participant_id, team_id, competition_id, 1
#     ))
#     result_id = cursor.lastrowid

#     # 6. Командные результаты
#     cursor.execute("""
#         INSERT INTO team_results (
#             participants_results_id,
#             participants_results_participants_id,
#             participants_results_teams_id,
#             participants_results_competitions_id,
#             position
#         ) VALUES (?, ?, ?, ?, ?)
#     """, (
#         result_id, participant_id, team_id, competition_id, 1
#     ))

#     conn.commit()
#     print("Тестовые данные успешно добавлены.")

# except sqlite3.Error as e:
#     print(f"Ошибка при вставке данных: {e}")
#     conn.rollback()

try:
    cursor.execute("SELECT * FROM competitions WHERE date = ?", ('2025-07-01',))
    rows = cursor.fetchall()
    for row in rows:
       print(row)

except sqlite3.Error as e:
    print(f"Ошибка при вставке данных: {e}")
    conn.rollback()


finally:
    conn.close()
