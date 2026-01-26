from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from database import get_db
from crud.participantResult import create_participant_result, get_participant_result, get_all_participant_results, update_participant_result, delete_participant_result
from schemas import ParticipantsResultsIn, ParticipantsResultsOut

router = APIRouter()


@router.post("/", response_model=ParticipantsResultsOut, status_code=201)
def create_pr(result: ParticipantsResultsIn, db: Session = Depends(get_db)):
    return create_participant_result(db, result)


@router.get("/", response_model=List[ParticipantsResultsOut])
def get_pr(db: Session = Depends(get_db)):
    return get_all_participant_results(db)


@router.get("/{result_id}", response_model=ParticipantsResultsOut)
def get_pr(result_id: int, db: Session = Depends(get_db)):
    result = get_participant_result(db, result_id)
    if not result:
        raise HTTPException(status_code=404, detail="Result not found")
    return result


@router.put("/{result_id}", response_model=ParticipantsResultsOut)
def update_pr(result_id: int, update_data: Dict[str, Any], db: Session = Depends(get_db)):
    updated = update_participant_result(db, result_id, update_data)
    if not updated:
        raise HTTPException(status_code=404, detail="Result not found")
    return updated


@router.delete("/{result_id}", response_model=ParticipantsResultsOut)
def delete_pr(result_id: int, db: Session = Depends(get_db)):
    deleted = delete_participant_result(db, result_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Result not found")
    return deleted
