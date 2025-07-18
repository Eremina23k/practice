from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db  # функция, возвращающая сессию БД
from crud.competition import creat_competition, read_competition, update_competition, delete_competition
from schemas import CompetitionIn, CompetitionOut

router = APIRouter()

@router.post("/", response_model=CompetitionOut)
def creat_c(comp: CompetitionIn, db: Session = Depends(get_db)):
    return creat_competition(db, comp)

@router.get("/{competition_id}", response_model=CompetitionOut)
def get_c(competition_id: int, db: Session = Depends(get_db)):
    db_comp = read_competition(db, competition_id)
    if db_comp is None:
        raise HTTPException(status_code=404, detail="Competition not found")
    return db_comp

@router.put("/{competition_id}", response_model=CompetitionOut)
def put_c(competition_id: int, comp: CompetitionIn, db: Session = Depends(get_db)):
    updated = update_competition(db, competition_id, comp.date)
    if updated is None:
        raise HTTPException(status_code=404, detail="Competition not found")
    return updated

@router.delete("/{competition_id}", response_model=CompetitionOut)
def delete_c(competition_id: int, db: Session = Depends(get_db)):
    deleted = delete_competition(db, competition_id)
    if deleted is None:
        raise HTTPException(status_code=404, detail="Competition not found")
    return deleted