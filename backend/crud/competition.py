from sqlalchemy.orm import Session
from datetime import date
from models import Competition
from schemas import CompetitionIn

def creat_competition (db: Session, comp: CompetitionIn) :
    db_comp = Competition(date=comp.date)
    db.add(db_comp)
    db.commit()
    db.refresh(db_comp)
    return db_comp

def read_competition (db: Session, competition_id: int) :
    return db.query(Competition).filter(Competition.id == competition_id).first()

def update_competition (db: Session, competition_id: int, new_date: date) :
    competition = db.query(Competition).filter(Competition.id == competition_id).first()
    if competition:
        competition.date = new_date
        db.commit()
        db.refresh(competition)
    return competition

def delete_competition (db: Session, competition_id: int) :
    competition = db.query(Competition).filter(Competition.id == competition_id).first()
    if competition:
        db.delete(competition)
        db.commit()
    return competition