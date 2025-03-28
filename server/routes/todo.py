from fastapi import APIRouter,HTTPException,Depends,Request
from sqlalchemy.orm import Session
from repositories.todo import TodoRepo
import schemas.todo as TodoSchema
from typing import List
from db.config  import get_db

router = APIRouter(prefix="/todos")

@router.get("/" , response_model=List[TodoSchema.Todo],tags=["Todos"])
def get_todos(request: Request,db : Session = Depends(get_db)):
    return TodoRepo.find_all(db=db,user_id=request.state.user.get("id"))

@router.post("/" , response_model=TodoSchema.Todo,tags=["Todos"])
def create_todo(request : Request,todo : TodoSchema.TodoCreate, db:Session = Depends(get_db)):
    return TodoRepo.create(db=db,todo=todo,user_id=request.state.user.get("id"))

@router.put("/{id}" , response_model=TodoSchema.Todo,tags=["Todos"])
def update_todo(id : int , todo : TodoSchema.TodoUpdate, db : Session = Depends(get_db)):
    updated_todo = TodoRepo.update(db,id,todo)

    if updated_todo is None:
        raise HTTPException(status_code=404,detail="Todo not found")
    return updated_todo

@router.delete("/{id}" , response_model=TodoSchema.Todo,tags=["Todos"])
def delete_todo(id: int , db : Session = Depends(get_db)):
    deleted_todo = TodoRepo.delete(db,id)
    if deleted_todo is None:
        raise HTTPException(status_code=404,detail="Todo not found to delete")
    return deleted_todo

@router.get("/{id}" , response_model=TodoSchema.Todo,tags=["Todos"])
def find_todo(id : int, db : Session = Depends(get_db)):
    todo = TodoRepo.find_by_id(db,id)
    if todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo
