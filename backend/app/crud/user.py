from sqlalchemy.orm import Session

from app import models
from app import schemas


def get_user(db: Session, user_id: int):
    return db.query(models.user.User).filter(models.user.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.user.User).filter(models.user.User.email == email).first()


def get_users_list(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.user.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.user.UserCreate):
    fake_hashed_pass = user.password + "notreallyhashedpass"
    db_user = models.user.User(email=user.email, hashed_pass=fake_hashed_pass)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def get_user_profile(db: Session, user_profile_id: int):
    return (
        db.query(models.user.UserProfile)
        .filter(models.user.UserProfile.id == user_profile_id)
        .first()
    )


def create_user_profile(
    db: Session, user_profile: schemas.user.UserProfileCreate, user_id: int
):
    db_user_profile = models.user.UserProfile(**user_profile.dict(), user_id=user_id)
    db.add(db_user_profile)
    db.commit()
    db.refresh(db_user_profile)
    
    return db_user_profile