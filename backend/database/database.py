import os
import sqlite3

# Абсолютный путь к текущему скрипту
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Пути к файлу базы и скрипту
db_path = os.path.join(BASE_DIR, 'CompetitionDB.bd')
sql_path = os.path.join(BASE_DIR, 'script.sql')

# Создаём подключение к базе
conn = sqlite3.connect(db_path)

# Включаем поддержку внешних ключей (важно для SQLite)
conn.execute("PRAGMA foreign_keys = ON")

cursor = conn.cursor()

# Открываем и выполняем SQL-скрипт
with open(sql_path, 'r', encoding='utf-8') as f:
    cursor.executescript(f.read())

conn.commit()
conn.close()
