import os
import sqlite3

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

db_path = os.path.join(BASE_DIR, 'CompetitionDB.bd')
sql_path = os.path.join(BASE_DIR, 'script.sql')

conn = sqlite3.connect(db_path)

conn.execute("PRAGMA foreign_keys = ON")

cursor = conn.cursor()

with open(sql_path, 'r', encoding='utf-8') as f:
    cursor.executescript(f.read())

conn.commit()
conn.close()
