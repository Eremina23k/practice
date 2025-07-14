from sqlalchemy.orm import Session
from models import Participant
from schemas import ParticipantIn
from typing import List, Optional

def create_participant(db: Session, participant: ParticipantIn):
    db_participant = Participant(
        full_name=participant.full_name,
        gender=participant.gender,
        team_id=participant.teams_id,
        competition_id=participant.teams_competitions_id,
        user_id=participant.user_id,
    )
    db.add(db_participant)
    db.commit()
    db.refresh(db_participant)
    return db_participant

def get_participant(db: Session, participant_id: int) -> Optional[Participant]:
    return db.query(Participant).filter(Participant.id == participant_id).first()

def get_all_participants(db: Session) -> List[Participant]:
    return db.query(Participant).all()

def update_participant(db: Session, participant_id: int, update_data: dict):
    participant = db.query(Participant).filter(Participant.id == participant_id).first()
    if not participant:
        return None
    for key, value in update_data.items():
        if hasattr(participant, key):
            setattr(participant, key, value)
    db.commit()
    db.refresh(participant)
    return participant

def delete_participant(db: Session, participant_id: int):
    participant = db.query(Participant).filter(Participant.id == participant_id).first()
    if participant:
        db.delete(participant)
        db.commit()
    return participant
