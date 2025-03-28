from pydantic import BaseModel,Field
from typing import List,Optional
from enums.todo import Priority,Status

class TodoBase(BaseModel):
    title : str = Field(...,min_length=3,description="Title of todo")
    description : str = Field(...,min_length=3,description="Description of todo")
    priority : Priority = Field(None,description="Priority of todo")
    status : Status = Field(None,description="Status of todo")

class TodoCreate(TodoBase):
    pass

class Todo(TodoBase):
    id : int

    class Config:
        orm_mode = True

class TodoUpdate(BaseModel):
    title : Optional[str] = Field(None,min_length=3,description="Title of todo")
    description : Optional[str] = Field(None,min_length=5,description="Description of todo")
    priority : Optional[Priority] = Field(None,description="Priority of todo")
    status : Optional[Status] = Field(None,description="Status of todo")