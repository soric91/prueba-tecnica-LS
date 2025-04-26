from datetime import datetime
from typing import List, Optional
from sqlalchemy import  Column, Integer, String, ARRAY, ForeignKey, DateTime
from enum import Enum
from sqlalchemy.orm import relationship
from src.DB.app import Base
from pydantic import BaseModel

class keywords(str, Enum):
    """Enum for keywords."""

    COORDINATES = "coordinates"
    FOUND = "found"
    MATRIX = "matrix"
    
    def __str__(self) -> str:
        return self.value



class LetterSoup(Base):
    __tablename__ = "letter_soup"

    id = Column(Integer, primary_key=True, index=True)
    matrix = Column(ARRAY(String), nullable=False)  # 2D matrix of letters
    creation_date = Column(DateTime, default=datetime.now) 

    letters_found = relationship("LetterFound", back_populates="letter_soup")
    letters_not_found = relationship("LetterNotFound", back_populates="letter_soup")


class LetterFound(Base):
    __tablename__ = "letter_found"

    id = Column(Integer, primary_key=True, index=True)
    word = Column(String, nullable=False)  
    letter_soup_id = Column(Integer, ForeignKey("letter_soup.id")) 
    coordinates = Column(ARRAY(Integer), nullable=False)  

    
    letter_soup = relationship("LetterSoup", back_populates="letters_found")
    

class LetterNotFound(Base):
    __tablename__ = "letter_not_found"

    id = Column(Integer, primary_key=True, index=True)
    word = Column(String, nullable=False)  
    letter_soup_id = Column(Integer, ForeignKey("letter_soup.id"))  
 
    
    letter_soup = relationship("LetterSoup", back_populates="letters_not_found")
    

    
class LetterSoupRequest(BaseModel):
    matrix: List[List[str]]
    
class LetterSoupResponse(LetterSoupRequest):
    id: Optional[int]
    creation_date: Optional[datetime]

    
    
class LetterFoundResponse(BaseModel):
    id: int
    word: str
    coordinates: List[tuple[int, int]]
    letter_soup_id: int


class LetterNotFoundResponse(BaseModel):
    id: int
    word: str
    letter_soup_id: int


class WordsList(BaseModel):
    id: int
    words: List[str]
    
    


    
    
    

    