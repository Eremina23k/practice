from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from database import get_db  # функция, возвращающая сессию БД
from crud.participant import (
    create_participant,
    get_participant,
    get_all_participants,
    update_participant,
    delete_participant
)
from schemas import ParticipantIn, ParticipantOut

router = APIRouter()

@router.post("/", response_model=ParticipantOut)
def create_p(participant: ParticipantIn, db: Session = Depends(get_db)):
    return create_participant(db, participant)


@router.get("/", response_model=List[ParticipantOut])
def get_p(db: Session = Depends(get_db)):
    return get_all_participants(db)


@router.get("/{participant_id}", response_model=ParticipantOut)
def get_p(participant_id: int, db: Session = Depends(get_db)):
    db_participant = get_participant(db, participant_id)
    if not db_participant:
        raise HTTPException(status_code=404, detail="Participant not found")
    return db_participant


@router.put("/{participant_id}", response_model=ParticipantOut)
def update_p(participant_id: int, update_data: Dict[str, Any], db: Session = Depends(get_db)):
    updated = update_participant(db, participant_id, update_data)
    if not updated:
        raise HTTPException(status_code=404, detail="Participant not found")
    return updated


@router.delete("/{participant_id}", response_model=ParticipantOut)
def delete_p(participant_id: int, db: Session = Depends(get_db)):
    deleted = delete_participant(db, participant_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Participant not found")
    return deleted
