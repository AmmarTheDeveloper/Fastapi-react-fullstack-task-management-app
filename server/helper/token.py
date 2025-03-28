from jose import jwt,JWTError
import schemas.user as UserSchema
from fastapi import HTTPException

ALGORITHM = "HS256"
SECRET = "$uperm@n"

def generate_token(data : UserSchema.User):
    return jwt.encode(data,SECRET,algorithm=ALGORITHM)

def decode_token(token):
    return jwt.decode(token,SECRET,algorithms=[ALGORITHM])

def verify_token(token):
    try:
        payload = decode_token(token)
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Token verification failed")