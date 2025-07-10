# разобраться с созданием json файл
# мб надо расписать на In и Out!!
# print(user.model_dump_json())

from pydantic import BaseModel
from typing import Optional
from datetime import date, time

class CompetitionIn(BaseModel): 
    date: date

class CompetitionOut(CompetitionIn): 
    id: int



class TeamIn(BaseModel):
    name: str
    competitions_id : int

class TeamOut(TeamIn):
    id: int



class UserIn(BaseModel):
    full_name : str
    login : str
    password : str
    gender : str
    role : str

class UserOut(UserIn):
    id : int



class ParticipantIn(BaseModel):
    full_name : str
    gender : str
    teams_id : int
    teams_competitions_id : int
    user_id : Optional[int] = None

class ParticipantOut(ParticipantIn):
    id : int



class Participants_resultsIn(BaseModel):
    bib_number : Optional[int] = None
    start_time : Optional[time] = None
    finish_time : Optional[time] = None
    checkpoints_visited : Optional[int] = None
    total_time : Optional[time] = None
    participants_id : int
    teams_id : int
    competitions_id : int
    position : int

class Participants_resultsOut(Participants_resultsIn):
    id : int



class Team_resultsIn(BaseModel):
    participants_results_id : int
    participants_results_participants_id : int
    participants_results_teams_id : int
    participants_results_competitions_id : int
    position : int

class Team_resultsOut(Team_resultsIn):
    id : int