from pydantic import BaseModel
from typing import Optional
from datetime import date, time

# Соревнования 
class CompetitionIn(BaseModel): 
    date: date

class CompetitionOut(CompetitionIn): 
    id: int

    class Config:
        orm_mode = True


# Команды
class TeamIn(BaseModel):
    name: str
    competitions_id: int

class TeamOut(TeamIn):
    id: int

    class Config:
        orm_mode = True


# Пользователи
class UserRole(str, Enum):
    admin = "admin"
    user = "user"
    
class UserIn(BaseModel):
    full_name: str
    login: str
    password: str
    gender: str
    role: str

class UserOut(UserIn):
    id: int

    class Config:
        orm_mode = True


# Участники
class ParticipantIn(BaseModel):
    full_name: str
    gender: str
    teams_id: int
    teams_competitions_id: int
    user_id: Optional[int] = None

class ParticipantOut(ParticipantIn):
    id: int

    class Config:
        orm_mode = True


# Результаты участников
class ParticipantsResultsIn(BaseModel):
    bib_number: Optional[int] = None
    start_time: Optional[time] = None
    finish_time: Optional[time] = None
    checkpoints_visited: Optional[int] = None
    total_time: Optional[time] = None
    participant_id: int
    team_id: int
    competition_id: int
    position: int

class ParticipantsResultsOut(ParticipantsResultsIn):
    id: int

    class Config:
        orm_mode = True


# Результаты команд
class TeamResultsIn(BaseModel):
    participants_results_id: int
    participants_results_participants_id: int
    participants_results_teams_id: int
    participants_results_competitions_id: int
    position: int

class TeamResultsOut(TeamResultsIn):
    id: int

    class Config:
        orm_mode = True
