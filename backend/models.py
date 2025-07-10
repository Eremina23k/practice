from sqlalchemy import Column, Integer, String, ForeignKey, Date, Time
from sqlalchemy.orm import relationship, declarative_base
from datetime import date, time

Base = declarative_base()

# Соревнования
class Competition(Base):
    __tablename__ = 'competitions'

    id = Column(Integer, primary_key=True)
    date = Column(Date, nullable=False)

    teams = relationship("Team", back_populates="competition")
    participants_results = relationship("ParticipantResult", back_populates="competition")

# Команды
class Team(Base):
    __tablename__ = 'teams'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    competition_id = Column(Integer, ForeignKey('competitions.id'))

    competition = relationship("Competition", back_populates="teams")
    participants = relationship("Participant", back_populates="team")
    participants_results = relationship("ParticipantResult", back_populates="team")

# Пользователи
class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    full_name = Column(String, nullable=False)
    login = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    gender = Column(String, nullable=False)
    role = Column(String, nullable=False)

    participants = relationship("Participant", back_populates="user")

# Участники
class Participant(Base):
    __tablename__ = 'participants'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=True)
    full_name = Column(String, nullable=False)
    gender = Column(String, nullable=False)
    team_id = Column(Integer, ForeignKey('teams.id'))
    competition_id = Column(Integer, ForeignKey('competitions.id'))

    user = relationship("User", back_populates="participants")
    team = relationship("Team", back_populates="participants")
    results = relationship("ParticipantResult", back_populates="participant")

# Результаты участников
class ParticipantResult(Base):
    __tablename__ = 'participant_results'

    id = Column(Integer, primary_key=True)
    bib_number = Column(Integer, nullable=True)
    start_time = Column(Time, nullable=True)
    finish_time = Column(Time, nullable=True)
    checkpoints_visited = Column(Integer, nullable=True)
    total_time = Column(Time, nullable=True)
    participant_id = Column(Integer, ForeignKey('participants.id'))
    team_id = Column(Integer, ForeignKey('teams.id'))
    competition_id = Column(Integer, ForeignKey('competitions.id'))
    position = Column(Integer, nullable=False)

    participant = relationship("Participant", back_populates="results")
    team = relationship("Team", back_populates="participants_results")
    competition = relationship("Competition", back_populates="participants_results")
    team_result = relationship("TeamResult", back_populates="participant_result", uselist=False)

# Командные результаты
class TeamResult(Base):
    __tablename__ = 'team_results'

    id = Column(Integer, primary_key=True)
    participant_result_id = Column(Integer, ForeignKey('participant_results.id'))
    position = Column(Integer, nullable=False)

    participant_result = relationship("ParticipantResult", back_populates="team_result")


# class Competitions(Base): 
#     id: int
#     date: date

# class Teams(BaseModel):
#     id: int
#     name: str
#     competitions_id : int

# class Users(BaseModel):
#     id : int
#     full_name : str
#     login : str
#     password : str
#     gender : str
#     role : str

# class Participants ():
#     id : int
#     user_id : Optional[int] = None
#     full_name : str
#     gender : str
#     teams_id : int
#     teams_competitions_id : int

# class Participants_results():
#     id : int
#     bib_number : Optional[int] = None
#     start_time : Optional[time] = None
#     finish_time : Optional[time] = None
#     checkpoints_visited : Optional[int] = None
#     total_time : Optional[time] = None
#     participants_id : int
#     teams_id : int
#     competitions_id : int
#     position : int

# class Team_results ():
#     id : int
#     participants_results_id : int
#     participants_results_participants_id : int
#     participants_results_teams_id : int
#     participants_results_competitions_id : int
#     position : int
