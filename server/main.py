from fastapi import FastAPI,HTTPException,Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from db.config import engine
import models.todo as TodoModel
from routes.todo import router as TodoRouter
from routes.auth import router as AuthRouter
from middlewares.auth import VerifyToken,VerifyTokenInvalid

app = FastAPI(title="FastAPI Crud Application",description="CRUD application with swagger and sqlalchemy")

origins = [
    "http://localhost:5173"
]

# model and database binding
TodoModel.Base.metadata.create_all(bind=engine)

# middlwares

# logged in users verification middleware
app.add_middleware(VerifyToken)

# logged out users verification middleware
app.add_middleware(VerifyTokenInvalid)


# cors middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# exception handling
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, e: HTTPException):
    return JSONResponse(
        status_code=e.status_code,
        content={"message": e.detail}
    )

@app.exception_handler(Exception)
def validation_exception(request, err):
    error_message = f"Failed to executed {request.method}: {request.url}"
    return JSONResponse(status_code=400,content = { "message" : f"{error_message}. Detail: {err}"})


# todos api's
app.include_router(TodoRouter)

# login register api's
app.include_router(AuthRouter)