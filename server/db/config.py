from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URI = "mysql://root:root@localhost:3306/fastapi_crud"

engine = create_engine(SQLALCHEMY_DATABASE_URI,echo=True)
# sql statements will be logged if echo is true

# connect_args={"check_same_thread" :False} only required for sqlite
#  used to disable SQLite's thread safety check
# SQLite allows only the same thread that created the connection to use it
# useful in multithread application

SessionLocal = sessionmaker(autocommit=False,autoflush=False,bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()