from pydantic import Field,BaseModel
from typing import Optional
from enums.user import Gender

class BaseUser(BaseModel):
    name : str = Field(...,min_length=3,description="Name of the user")
    email : str = Field(...,min_length=5,description="Email of the user")
    gender : Gender = Field(None,description="Gender of the user")

class UserCreate(BaseUser):
    password : str = Field(...,min_length=3,description="Password of user")

class UserLogin(BaseModel):
    email : str = Field(...,min_length=5,description="Email of the user")
    password : str = Field(...,min_length=3,description="Password of user")

class User(BaseUser):
    id: int

    class Config():
        orm_mode=True
