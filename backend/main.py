from fastapi import FastAPI, Depends, HTTPException
from src import schemas, models, crud
from sqlalchemy.orm import Session
from src.deps import get_db
from src.db.database import engine

models.user.Base.metadata.create_all(bind=engine)

app = FastAPI()


app.post("/users/", response_model=schemas.user.User)
def create_user(user: schemas.user.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.user.get_user_by_email(db, email=user.email)
    
    if db_user: 
        raise HTTPException(status_code=400, detail="The user with this email already registered!")
    
    return crud.user.create_user(db=db, user=user)

app.get("/users/", status_code=201)
def read_users(skip: int = 0, limit: int = 0, db: Session = Depends(get_db)):
    users = crud.user.get_users_list(db=db, skip=skip, limit=limit)
    
    return users

