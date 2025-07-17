from sqlalchemy.orm import Session
from models import Team
from schemas import TeamIn

def creat_team (db: Session, team: TeamIn) :
    db_team = Team(name=team.name, competition_id=team.competitions_id)
    db.add(db_team)
    db.commit()
    db.refresh(db_team)
    return db_team

def read_team (db: Session, team_id: int) :
    return db.query(Team).filter(Team.id == team_id).first()

def update_team(db: Session, team_id: int, name: str = None, competition_id: int = None):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        return None
    if name:
        team.name = name
    if competition_id:
        team.competition_id = competition_id
    db.commit()
    db.refresh(team)
    return team

def delete_team(db: Session, team_id: int):
    team = db.query(Team).filter(Team.id == team_id).first()
    if team:
        db.delete(team)
        db.commit()
    return team
