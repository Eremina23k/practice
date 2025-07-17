from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from database import get_db  # функция, возвращающая сессию БД
from crud.user import create_user, get_user, get_user_by_login, update_user, delete_user
from schemas import UserIn, UserOut

router = APIRouter()

@router.post("/", response_model=UserOut)
def api_create_user(user: UserIn, db: Session = Depends(get_db)):
    if get_user_by_login(db, user.login):
        raise HTTPException(status_code=400, detail="Login already exists")
    db_user = create_user(db, user)  # пароль будет захеширован внутри create_user
    return db_user

@router.get("/{user_id}", response_model=UserOut)
def get_u():
    return