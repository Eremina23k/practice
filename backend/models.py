# разобраться с созданием json файл
# print(user.model_dump_json())

from pydantic import BaseModel
from typing import Optional
from datetime import date, time

class Competitions(BaseModel): 
    id: int
    date: date

class Teams(BaseModel):
    id: int
    name: str
    competitions_id : int

class Users(BaseModel):
    id : int
    full_name : str
    login : str
    password : str
    gender : str
    role : str

class Participants ():
    id : int
    user_id : Optional[int] = None
    full_name : str
    gender : str
    teams_id : int
    teams_competitions_id : int

class Participants_results():
    id : int
    bib_number : Optional[int] = None
    start_time : Optional[time] = None
    finish_time : Optional[time] = None
    checkpoints_visited : Optional[int] = None
    total_time : Optional[time] = None
    participants_id : int
    teams_id : int
    competitions_id : int
    position : int

class Team_results ():
    id : int
    participants_results_id : int
    participants_results_participants_id : int
    participants_results_teams_id : int
    participants_results_competitions_id : int
    position : int
