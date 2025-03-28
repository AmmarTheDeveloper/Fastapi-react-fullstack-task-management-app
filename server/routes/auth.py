from fastapi import APIRouter,Depends,HTTPException,Request
from fastapi.security import HTTPAuthorizationCredentials,HTTPBearer
import schemas.user as UserSchema
from repositories.user import UserRepo
from sqlalchemy.orm import Session
from db.config import get_db
from pydantic import BaseModel
from helper.token import generate_token,verify_token

security = HTTPBearer()

router = APIRouter(prefix="/auth")

class AuthResponse(BaseModel):
    user : UserSchema.User
    token : str

# @router.post("/verify" , response_model=UserSchema.User,tags=["Auth"])
# def verify_user(auth: HTTPAuthorizationCredentials = Depends(security)):
#     try:
#         payload = verify_token(auth.credentials)
#         return payload
#     except HTTPException as exc:
#         raise HTTPException(status_code=exc.status_code, detail=exc.detail)
#     except Exception as e:
#         raise HTTPException(status_code=401, detail="Invalid or expired token")

@router.post("/verify" , response_model=UserSchema.User,tags=["Auth"])
def verify_user(request : Request):
    return request.state.user

@router.post("/register",response_model=UserSchema.User,tags=["Auth"])
def register_user(user:UserSchema.UserCreate,db : Session = Depends(get_db)):
        try:
            return UserRepo.create(db,user)
        except Exception as e:
            if "Duplicate" in str(e):
                raise HTTPException(status_code=409,detail="User already registered")
            raise HTTPException(status_code=500,detail=str(e))

@router.post("/login",response_model=AuthResponse,tags=["Auth"])
def login_user(user:UserSchema.UserLogin,db : Session = Depends(get_db)):
    found_user = UserRepo.getByEmailAndPassword(db,user)

    if not found_user:
        raise HTTPException(status_code=404,detail="Invalid email or password")

    user_data = {
        "id" : found_user.id,
        "name" : found_user.name,
        "email" : found_user.email,
        "gender" : found_user.gender
    }

    token = generate_token(user_data)
    response = AuthResponse(user=user_data,token=token)
    return response