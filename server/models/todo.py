from db.config import Base
from sqlalchemy import Column,Integer,String,Enum,ForeignKey,DateTime
from sqlalchemy.orm import relationship
from enums.todo import Priority,Status
from sqlalchemy.sql import func

class Todo(Base):
    __tablename__  = "todo"

    id = Column(Integer,primary_key=True,autoincrement=True)
    title = Column(String(255),nullable=False)
    description = Column(String(255),nullable=False)
    priority = Column(Enum(Priority),nullable=False,default=Priority.LOW)
    status = Column(Enum(Status),nullable=False,default=Status.PENDING)
    created_at = Column(DateTime,server_default=func.now())

    user_id = Column(Integer,ForeignKey("user.id"))
    user = relationship("User",back_populates="todos",cascade="all, delete")

    def __repr__(self):
        return  (f"<Todo(id={self.id}, title='{self.title}', priority={self.priority}, "
            f"status={self.status}, created_at={self.created_at}, user_id={self.user_id})>")
