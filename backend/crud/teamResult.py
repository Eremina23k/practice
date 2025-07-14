from sqlalchemy.orm import Session
from models import TeamResult
from schemas import TeamResultsIn
from typing import List, Optional

def create_team_result(db: Session, team_result: TeamResultsIn) -> TeamResult:
    db_result = TeamResult(
        participant_result_id=team_result.participants_results_id,
        position=team_result.position
    )
    db.add(db_result)
    db.commit()
    db.refresh(db_result)
    return db_result

def get_team_result(db: Session, result_id: int) -> Optional[TeamResult]:
    return db.query(TeamResult).filter(TeamResult.id == result_id).first()

def get_all_team_results(db: Session) -> List[TeamResult]:
    return db.query(TeamResult).all()

def update_team_result(db: Session, result_id: int, new_position: int) -> Optional[TeamResult]:
    result = db.query(TeamResult).filter(TeamResult.id == result_id).first()
    if result:
        result.position = new_position
        db.commit()
        db.refresh(result)
    return result

def delete_team_result(db: Session, result_id: int) -> Optional[TeamResult]:
    result = db.query(TeamResult).filter(TeamResult.id == result_id).first()
    if result:
        db.delete(result)
        db.commit()
    return result
