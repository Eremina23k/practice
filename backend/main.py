from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routers import competition, participant, participantResult, team, teamResult, user

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(competition.router)
app.include_router(participant.router)
app.include_router(participantResult.router)
app.include_router(team.router)
app.include_router(teamResult.router)
app.include_router(user.router)