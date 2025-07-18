from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from database import get_db
from crud.user import create_user, get_user, get_user_by_login, update_user, delete_user
from schemas import UserIn, UserOut, UserRole
from auth import authenticate_user, require_role  # 👈 Добавлено для авторизации

router = APIRouter(prefix="/users", tags=["Users"])

# Создание нового пользователя 
@router.post("/", response_model=UserOut)
def create_u(user: UserIn, db: Session = Depends(get_db)):
    # Проверяем, что логин уникален
    db_user = get_user_by_login(db, user.login)
    if db_user:
        raise HTTPException(status_code=400, detail="Login already registered")
    # Создаём пользователя с той ролью, что передали в запросе
    return create_user(db, user)

# Получение данных пользователя (доступно любому авторизованному пользователю)
@router.get("/{user_id}", response_model=UserOut)
def read_u(user_id: int, db: Session = Depends(get_db), _: UserOut = Depends(authenticate_user)):
    db_user = get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# Обновление пользователя (только админ может обновлять данные)
@router.put("/{user_id}", response_model=UserOut, dependencies=[Depends(require_role(UserRole.admin))])
def update_u(user_id: int, user_update: dict, db: Session = Depends(get_db)):
    updated_user = update_user(db, user_id, user_update)
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user

# Удаление пользователя (только админ)
@router.delete("/{user_id}", response_model=UserOut, dependencies=[Depends(require_role(UserRole.admin))])
def remove_u(user_id: int, db: Session = Depends(get_db)):
    deleted_user = delete_user(db, user_id)
    if not deleted_user:
        raise HTTPException(status_code=404, detail="User not found")
    return deleted_user