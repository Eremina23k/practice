import sqlite3

conn = sqlite3.connect('./CompetitionDB.bd')
cursor = conn.cursor()

with open('./script.sql', 'r', encoding='utf-8') as f:
    cursor.executescript(f.read())

conn.commit()
