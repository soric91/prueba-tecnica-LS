
from typing import  Dict, List, Union
from src.app.app import GameLetterSoup
from fastapi import APIRouter, Body, HTTPException, status
from src.models.model import LetterSoupResponse, LetterSoupRequest, WordsList, keywords, LetterFoundResponse, LetterNotFoundResponse
from src.crud.app import get_letter_soup, save_letter_soup
from src.Utils.app import parse_matrix, save_words_letter_soup, convert_to_word_list
from src.DB.app import get_session_db


router = APIRouter()

@router.post("/api/lettersoup/save", response_model=LetterSoupResponse, status_code=status.HTTP_201_CREATED)
async def storage_lettersoup(
    matrix: Union[LetterSoupRequest, Dict] = Body(..., description="Matrix data for the letter soup", example={
        "matrix": [
            ["A", "B", "C", "D"],
            ["E", "F", "G", "H"],
            ["I", "J", "K", "L"],
            ["M", "N", "O", "P"]
        ]
    }),
):
    try:
        session = get_session_db()

        matrix_input = matrix.matrix if isinstance(matrix, LetterSoupRequest) else matrix[keywords.MATRIX.value]
        print(f"Matrix input: {matrix_input}")
        matrix_is_valid = parse_matrix(matrix_input)

        if not matrix_is_valid:
            raise HTTPException(status_code=400, detail="Matrix is not valid")

        letter_soup = save_letter_soup(session, matrix_is_valid)

        if letter_soup is None:
            raise HTTPException(status_code=500, detail="Error saving matrix in the database")

        resp_letter_soup = LetterSoupResponse(
            id=letter_soup.id,
            matrix=letter_soup.matrix,
            creation_date=letter_soup.creation_date
        )
        return resp_letter_soup
    
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
@router.post("/api/lettersoup/resolve", status_code=status.HTTP_200_OK, response_model=List[Union[LetterFoundResponse, LetterNotFoundResponse]])
async def resolve_lettersoup(
    id: int = Body(..., embed=True, description="ID of the letter soup to resolve", example=1),
    words: Union[ WordsList, str] = Body(..., description="The list of words to find in the letter soup", example=["PERRO", "GATO", "TIBURON", "ELEFANTE"]),
):
    try:

        response = []
        
        session = get_session_db()

        letter_soup = get_letter_soup(session, id)

        list_word = convert_to_word_list(words) 
        
        if letter_soup is None:
            raise HTTPException(status_code=404, detail="Letter soup not found")

        id_letter_soup = letter_soup.id
        game = GameLetterSoup(letter_soup.matrix, list_word)
        result_latter_soup = game.response_result()

        response = save_words_letter_soup(session, id_letter_soup, result_latter_soup)

        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    
