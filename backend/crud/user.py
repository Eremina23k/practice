from sqlalchemy.orm import Session
from models import User
from schemas import UserIn

def create_user(db: Session, user: UserIn):
    db_user = User(
        full_name=user.full_name,
        login=user.login,
        password=user.password,  # хешировать!
        gender=user.gender,
        role=user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_login(db: Session, login: str):
    return db.query(User).filter(User.login == login).first()

def update_user(db: Session, user_id: int, new_data: dict):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return None
    for key, value in new_data.items():
        if hasattr(user, key):
            setattr(user, key, value)
    db.commit()
    db.refresh(user)
    return user

def delete_user(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        db.delete(user)
        db.commit()
    return user
