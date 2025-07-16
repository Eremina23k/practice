from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Competition
from schemas import CompetitionCreate, CompetitionOut