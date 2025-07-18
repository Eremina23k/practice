from fastapi import Depends, Header, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from crud.user import get_user_by_login
from schemas import UserOut, UserRole

# Аутентификация по login и password из заголовков
def authenticate_user(
    login: str = Header(...),           # Заголовок: login
    password: str = Header(...),        # Заголовок: password
    db: Session = Depends(get_db)
) -> UserOut:
    user = get_user_by_login(db, login)
    # Проверка наличия пользователя и совпадения пароля
    if not user or user.password != password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user  # Возвращает объект пользователя

# Авторизация: разрешение только для указанной роли (например, admin)
def require_role(required_role: UserRole):
    def checker(user: UserOut = Depends(authenticate_user)):
        # Если роль пользователя не соответствует нужной — отказ
        if user.role != required_role:
            raise HTTPException(status_code=403, detail=f"{required_role} role required")
        return user
    return checker
