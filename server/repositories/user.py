from sqlalchemy.orm import Session
import schemas.user as schema
import models.user as model
from helper.hashing import generate_hash_password,verify_password

class UserRepo():

    def create(db : Session,user : schema.UserCreate):
        hashed_password = generate_hash_password(user.password)
        new_user = model.User(name=user.name,email=user.email,password=hashed_password,gender=user.gender)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user

    def getByEmailAndPassword(db : Session,user : schema.UserLogin):
        found_user = db.query(model.User).filter(model.User.email == user.email).first()
        if not found_user:
            return None
        isValidPassword = verify_password(user.password,found_user.password)
        if not isValidPassword:
            return None
        return found_user
