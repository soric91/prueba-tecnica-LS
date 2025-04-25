from sqlalchemy import create_engine
from src.core.config import settings
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy_utils import database_exists, create_database
from sqlalchemy.orm import sessionmaker

engine = create_engine(settings.sqlalchemy_uri, echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def create_db():
    if not database_exists(engine.url):
        create_database(engine.url)
    Base.metadata.create_all(engine)
    
    
def get_session_db()-> sessionmaker:
    create_db()
    return SessionLocal()