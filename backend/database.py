from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Путь к SQLite-базе
SQLALCHEMY_DATABASE_URL = "sqlite:///./CompetitionDB.bd"

# Создание движка
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False}  # Для SQLite (многопоточность)
)

# Фабрика сессий
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Базовый класс для всех ORM-моделей
Base = declarative_base()

# Функция для получения сессии (удобно использовать в зависимости или context manager)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
