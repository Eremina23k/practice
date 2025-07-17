from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from database import get_db  # функция, возвращающая сессию БД
from crud.team import creat_team, read_team, update_team, delete_team
from schemas import TeamIn, TeamOut

router = APIRouter()

@router.post("/", response_model=TeamOut)
def creat_t (team: TeamIn, db: Session = Depends(get_db)):
    return creat_team(db, team)

@router.get("/{team_id}")
def get_t (team_id: int, db: Session = Depends(get_db)):
    db_team = read_team(db, team_id)
    if db_team is None:
        raise HTTPException(status_code=404, detail= "Team not found")
    return db_team

@router.put("/{team_id}", response_model=TeamOut)
def put_team(team_id: int, team: TeamIn, db: Session = Depends(get_db)):
    updated = update_team(db, team_id, team.name, team.competitions_id)
    if updated is None:
        raise HTTPException(status_code=404, detail="Team not found")
    return updated

@router.delete("/{team_id}", response_model=TeamOut)
def delete_team(team_id: int, team: TeamIn, db: Session = Depends(get_db)):
    deleted = delete_team(db, team_id, team.date)
    if deleted is None:
        raise HTTPException(status_code=404, detail="Team not found")
    return deleted