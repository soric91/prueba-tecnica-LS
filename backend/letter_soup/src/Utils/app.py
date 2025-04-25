from typing import Dict, List, Union
from src.models.model import LetterFoundResponse, LetterNotFoundResponse, keywords
from src.crud.app import save_letter_found, save_letter_not_found
from sqlalchemy.orm import Session
import math


def parse_matrix(matrix_input: Union[str, list]) -> list[list[str]]:
    """
    Parses a matrix input which can be a string or a list of lists.
    If it's a string, it splits the string into lines and then splits each line into characters."""
    
    if isinstance(matrix_input, str):
        # Si es un string, parseamos el texto a lista 2D
        return [line.strip().split(", ") for line in matrix_input.strip().split("\n")]
    elif isinstance(matrix_input, list):
        # Verificamos que sea una lista de listas
        if all(isinstance(row, list) and all(isinstance(char, str) for char in row) for row in matrix_input):
            return matrix_input
        else:
            raise ValueError("La matriz no está bien estructurada como lista de listas de strings.")
    else:
        raise TypeError("La entrada debe ser una cadena o una lista de listas.")
    
    
def save_words_letter_soup(db: Session, id: int , data: Dict) -> List[Union[LetterFoundResponse, LetterNotFoundResponse]]:
    """ store words from the word search in the database """
    
    response = []
    
    for palabra, info in data.items():
        if info.get(keywords.FOUND.value, False):
            resp=save_letter_found(
                db=db,
                letter_soup_id=id,
                word=palabra,
                coordinates=info.get(keywords.COORDINATES.value, [])
            )
            response.append(resp)
        else:
            resp = save_letter_not_found(
                db=db,
                letter_soup_id=id,
                word=palabra
            )
            response.append(resp)
    return response
            
            
def convert_to_word_list(data: Union[str, List[str]]) -> List[str]:
    """
    Takes either a newline-separated string or a list of strings.
    If it's a string, it converts it into a list by splitting lines.
    If it's already a list of strings, it returns it as is.
    """
    if isinstance(data, list):
        return data
    elif isinstance(data, str):
        return [line.strip() for line in data.strip().splitlines() if line.strip()]
    else:
        raise ValueError("Input must be either a string or a list of strings.")


