from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db  # функция, возвращающая сессию БД
from crud.user import create_user, get_user, get_user_by_login, update_user, delete_user
from schemas import UserIn, UserOut

router = APIRouter()

@router.post("/", response_model=UserOut)
def create_u(user: UserIn, db: Session = Depends(get_db)):
    db_user = get_user_by_login(db, user.login)
    if db_user:
        raise HTTPException(status_code=400, detail="Login already registered")
    return create_user(db, user)


@router.get("/{user_id}", response_model=UserOut)
def read_u(user_id: int, db: Session = Depends(get_db)):
    db_user = get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.put("/{user_id}", response_model=UserOut)
def update_u(user_id: int, user_update: dict, db: Session = Depends(get_db)):
    updated_user = update_user(db, user_id, user_update)
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user


@router.delete("/{user_id}", response_model=UserOut)
def remove_u(user_id: int, db: Session = Depends(get_db)):
    deleted_user = delete_user(db, user_id)
    if not deleted_user:
        raise HTTPException(status_code=404, detail="User not found")
    return deleted_user