from sqlalchemy.orm import Session
import schemas.todo as schema
import models.todo as model

class TodoRepo():

    def create(db: Session,todo: schema.TodoCreate,user_id : int):
        new_todo=model.Todo(title=todo.title,description=todo.description,status=todo.status,priority=todo.priority,user_id=user_id)
        db.add(new_todo)
        db.commit()
        db.refresh(new_todo)
        return new_todo

    def find_by_id(db: Session,id : int):
        return db.query(model.Todo).filter(model.Todo.id == id).first()

    def find_all(db : Session,user_id : int):
        return db.query(model.Todo).filter(model.Todo.user_id == user_id).all()

    def delete(db: Session,id : int):
        todo = db.query(model.Todo).filter(model.Todo.id == id).first()
        if not todo:
            return None
        db.delete(todo)
        db.commit()
        return todo

    def update(db:Session,id : int,todo : schema.TodoUpdate):

        current_todo = db.query(model.Todo).filter(model.Todo.id == id).first()

        if not current_todo:
            return None

        if todo.title is not None:
            current_todo.title = todo.title
        if todo.description is not None:
            current_todo.description = todo.description
        if todo.priority is not None:
            current_todo.priority = todo.priority
        if todo.status is not None:
            current_todo.status = todo.status

        db.commit()
        db.refresh(current_todo)
        return current_todo