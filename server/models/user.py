from db.config import Base
from sqlalchemy import Column,Integer,String,Enum
from enums.user import Gender
from sqlalchemy.orm import relationship

class  User(Base):
    __tablename__ = "user"
    id = Column(Integer,primary_key=True,autoincrement=True)
    name = Column(String(50),nullable=False)
    email =Column(String(100),nullable=False,unique=True)
    password = Column(String(1000),nullable=False)
    gender = Column(Enum(Gender),nullable=False)

    todos = relationship("Todo", back_populates="user", cascade="all, delete")

    def __repr__(self):
        return f"<User(id={self.id}, name={self.name}, email={self.email}, password={self.password}, gender={self.gender})>"