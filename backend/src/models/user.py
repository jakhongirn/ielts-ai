from sqlalchemy import Boolean, String, Integer, DateTime, ForeignKey, Column
from sqlalchemy.orm import relationship
from datetime import datetime

from src.db.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, index=True)
    hashed_pass = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    user_type = Column(String(15), default=False)

    profile = relationship("UserProfile", uselist=False)


class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True)
    first_name = Column(String(50), nullable=True)
    last_name = Column(String(50), nullable=True)
    phone_number = Column(Integer, nullable=True)
    date_birth = Column(DateTime, nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow)

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="user_profiles")