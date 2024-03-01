import typing as t
from sqlalchemy.ext.declarative import declarative_base
from session import engine
    
Base = declarative_base()

Base.metadata.create_all(engine)
