from fastapi import APIRouter, HTTPException
from backend.schemas.auth import UserRegister, UserLogin
from backend.services.auth_service import register_user, login_user
from backend.config.security import get_current_user
from fastapi import Depends

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.get("/test")
def test_auth():
    return {
        "message": "Authentication route is working!"
    }
    
@router.post("/register")
def register(user: UserRegister):
    result = register_user(
        name=user.name,
        email=user.email,
        password=user.password
    )

    if "error" in result:
        raise HTTPException(
            status_code=409,
            detail=result["error"]
        )

    return result

@router.post("/login")
def login(user: UserLogin):
    result = login_user(
        email=user.email,
        password=user.password
    )

    if "error" in result:
        raise HTTPException(
            status_code=401,
            detail=result["error"]
        )

    return result

@router.get("/me")
def get_me(current_user: dict = Depends(get_current_user)):
    return {
        "message": "Token verified successfully",
        "user": current_user
    }