from sqlalchemy.orm import Session
from models import ParticipantResult
from schemas import ParticipantsResultsIn
from typing import List, Optional

def create_participant_result(db: Session, result: ParticipantsResultsIn):
    db_result = ParticipantResult(
        bib_number=result.bib_number,
        start_time=result.start_time,
        finish_time=result.finish_time,
        checkpoints_visited=result.checkpoints_visited,
        total_time=result.total_time,
        participant_id=result.participant_id,
        team_id=result.team_id,
        competition_id=result.competition_id,
        position=result.position
    )
    db.add(db_result)
    db.commit()
    db.refresh(db_result)
    return db_result

def get_participant_result(db: Session, result_id: int) -> Optional[ParticipantResult]:
    return db.query(ParticipantResult).filter(ParticipantResult.id == result_id).first()

def get_all_participant_results(db: Session) -> List[ParticipantResult]:
    return db.query(ParticipantResult).all()

def update_participant_result(db: Session, result_id: int, update_data: dict) -> Optional[ParticipantResult]:
    result = db.query(ParticipantResult).filter(ParticipantResult.id == result_id).first()
    if not result:
        return None
    for key, value in update_data.items():
        if hasattr(result, key):
            setattr(result, key, value)
    db.commit()
    db.refresh(result)
    return result

def delete_participant_result(db: Session, result_id: int) -> Optional[ParticipantResult]:
    result = db.query(ParticipantResult).filter(ParticipantResult.id == result_id).first()
    if result:
        db.delete(result)
        db.commit()
    return result
