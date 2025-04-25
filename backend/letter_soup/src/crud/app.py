from sqlalchemy.orm import Session
from src.models.model import LetterFound, LetterFoundResponse, LetterNotFound, LetterNotFoundResponse, LetterSoup



def save_letter_soup(db: Session, matrix: list[list[str]]) -> LetterSoup:
    letter_soup = LetterSoup(matrix=matrix)
    db.add(letter_soup)
    db.commit()
    db.refresh(letter_soup)
    return letter_soup


def save_letter_found(db: Session, letter_soup_id: int, word: str, coordinates: list[tuple[int, int]]) -> LetterFoundResponse:
    letter_found = LetterFound(
        word=word,
        letter_soup_id=letter_soup_id,
        coordinates=coordinates,
    )
    db.add(letter_found)
    db.commit()
    db.refresh(letter_found)
    respoonse = LetterFoundResponse(
        id=letter_found.id,
        word=letter_found.word,
        letter_soup_id=letter_found.letter_soup_id,
        coordinates=letter_found.coordinates
    )
    return respoonse
    
    
def save_letter_not_found(db: Session, letter_soup_id: int, word: str) -> LetterNotFoundResponse:
    letter_not_found = LetterNotFound(
        word=word,
        letter_soup_id=letter_soup_id
    )
    db.add(letter_not_found)
    db.commit()
    db.refresh(letter_not_found)
    response = LetterNotFoundResponse(
        id=letter_not_found.id,
        word=letter_not_found.word,
        letter_soup_id=letter_not_found.letter_soup_id
    )
    return response

def get_letter_soup(db: Session, letter_soup_id: int) -> LetterSoup:
    letter_soup = db.query(LetterSoup).filter(LetterSoup.id == letter_soup_id).first()
    return letter_soup