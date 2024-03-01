from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# UserProfile pydantic models
class UserProfileBase(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone_number: Optional[str] = None
    date_birth: Optional[datetime] = None
    
class UserProfileCreate(UserProfileBase):
    pass

class UserProfileUpdate(UserProfileBase):
    pass

class UserProfile(UserProfileBase):
    id: int
    updated_at: datetime
    
    class Config:
        orm_mode = True
        
        
#User pydantic model
class UserBase(BaseModel):
    username: str
    email: EmailStr
    
class UserCreate(UserBase):
    hashed_pass: str
    
class UserUpdate(UserBase):
    pass

class User(UserBase):
    id: int
    created_at: datetime
    user_type: str
    profile: Optional[UserProfile] = None
    
    class Config:
        orm_mode = True
        