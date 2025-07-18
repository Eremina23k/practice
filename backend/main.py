from fastapi import FastAPI
from database import Base, engine
from routers import competition, participant, participantResult, team, teamResult, user

app = FastAPI()

# Создание таблиц в базе данных (если их ещё нет)
Base.metadata.create_all(bind=engine)

# Подключение маршрутов (роутеров)
app.include_router(competition.router)
app.include_router(participant.router)
app.include_router(participantResult.router)
app.include_router(team.router)
app.include_router(teamResult.router)
app.include_router(user.router)