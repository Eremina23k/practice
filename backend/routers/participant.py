from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from database import get_db  # функция, возвращающая сессию БД
from crud.team import creat_team, read_team, update_team, delete_team
from schemas import TeamIn, TeamOut, TeamUpdate

router = APIRouter()

@router.post("/", response_model=TeamOut)
def create_team(team: TeamIn, db: Session = Depends(get_db)):
    return creat_team(db, team)

@router.get("/{team_id}", response_model=TeamOut)
def get_team(team_id: int, db: Session = Depends(get_db)):
    db_team = read_team(db, team_id)
    if not db_team:
        raise HTTPException(status_code=404, detail="Team not found")
    return db_team

@router.put("/{team_id}", response_model=TeamOut)
def update_existing_team(team_id: int, team_data: TeamUpdate, db: Session = Depends(get_db)):
    updated = update_team(db, team_id, team_data.dict(exclude_unset=True))
    if not updated:
        raise HTTPException(status_code=404, detail="Team not found")
    return updated

@router.delete("/{team_id}", response_model=TeamOut)
def delete_existing_team(team_id: int, db: Session = Depends(get_db)):
    deleted = delete_team(db, team_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Team not found")
    return deleted
