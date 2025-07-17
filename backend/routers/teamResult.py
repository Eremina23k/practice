from fastapi import APIRouter, HTTPException, Depends, Body
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from crud.teamResult import (
    create_team_result,
    get_team_result,
    get_all_team_results,
    update_team_result,
    delete_team_result
)
from schemas import TeamResultsIn, TeamResultsOut

router = APIRouter(
    prefix="/team-results",
    tags=["team_results"]
)


@router.post("/", response_model=TeamResultsOut, status_code=201)
def create_result(team_result: TeamResultsIn, db: Session = Depends(get_db)):
    return create_team_result(db, team_result)


@router.get("/", response_model=List[TeamResultsOut])
def get_all_results(db: Session = Depends(get_db)):
    return get_all_team_results(db)


@router.get("/{result_id}", response_model=TeamResultsOut)
def get_result(result_id: int, db: Session = Depends(get_db)):
    result = get_team_result(db, result_id)
    if not result:
        raise HTTPException(status_code=404, detail="Result not found")
    return result


@router.put("/{result_id}", response_model=TeamResultsOut)
def update_result(result_id: int, new_position: int = Body(..., embed=True), db: Session = Depends(get_db)):
    updated = update_team_result(db, result_id, new_position)
    if not updated:
        raise HTTPException(status_code=404, detail="Result not found")
    return updated


@router.delete("/{result_id}", response_model=TeamResultsOut)
def delete_result(result_id: int, db: Session = Depends(get_db)):
    deleted = delete_team_result(db, result_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Result not found")
    return deleted
