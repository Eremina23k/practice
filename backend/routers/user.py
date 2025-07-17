from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from database import get_db  # функция, возвращающая сессию БД
from crud.user import create_user, get_user, get_user_by_login, update_user, delete_user
from schemas import UserIn, UserOut