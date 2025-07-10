from pydantic import BaseModel, EmailStr 
from typing import Optional
from datetime import date

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
# user = UserExport(id=1, email="user@example.com")
# print(user.model_dump_json())