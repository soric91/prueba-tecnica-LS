from src.DB.app import  get_session_db
from src.crud.app import  save_letter_soup
from src.Utils.app import parse_matrix, save_words_letter_soup
from src.api.app import app
import uvicorn
from src.core.config import settings
def main():

    matrix=[['N', 'D', 'E', 'K', 'I', 'C', 'A', 'N', 'G', 'U', 'R', 'O', 'G', 'E'],
                ['S', 'X', 'R', 'Y', 'K', 'V', 'I', 'I', 'Q', 'G', 'W', 'Q', 'O', 'D'],
                ['J', 'A', 'G', 'U', 'A', 'R', 'Z', 'W', 'B', 'N', 'K', 'O', 'U', 'A'],
                ['M', 'L', 'E', 'L', 'E', 'F', 'A', 'N', 'T', 'E', 'H', 'O', 'G', 'W'],
               [ 'L', 'O', 'B', 'O', 'N', 'U', 'T', 'R', 'I', 'A', 'O', 'U', 'S', 'U'],
                ['W', 'W', 'O', 'S', 'O', 'G', 'A', 'T', 'O', 'V', 'R', 'T', 'M', 'O'],
               [ 'H', 'L', 'Z', 'N', 'C', 'T', 'Y', 'Z', 'E', 'O', 'X', 'A', 'U', 'R'],
               [ 'C', 'E', 'C', 'Y', 'T', 'I', 'B', 'U', 'R', 'O', 'N', 'S', 'R', 'O'],
               [ 'C', 'O', 'N', 'E', 'J', 'O', 'Y', 'U', 'S', 'M', 'R', 'S', 'H', 'T'],
               [ 'Y', 'N', 'I', 'F', 'E', 'F', 'P', 'T', 'E', 'Z', 'O', 'O', 'S', 'F'],
              [  'O', 'S', 'S', 'E', 'R', 'P', 'I', 'E', 'N', 'T', 'E', 'F', 'L', 'G'],
               [ 'P', 'P', 'V', 'D', 'D', 'X', 'U', 'F', 'A', 'L', 'P', 'O', 'N', 'Y'],
              [  'M', 'O', 'N', 'O', 'C', 'U', 'Q', 'W', 'M', 'A', 'N', 'A', 'T', 'I'],
              [  'N', 'N', 'X', 'H', 'E', 'B', 'P', 'M', 'U', 'P', 'E', 'R', 'R', 'O']]
    
    words_list = [
	"MANATI", "LEON",
	"PERRO", "LORO",
	"GATO", "TORO",
	"CONEJO", "ORUGA",
	"TIBURON",
	"ELEFANTE",
	"ALCON",
	"SERPIENTE",
	"JAGUAR",
	"CANGURO",
	"LOBO",
	"MONO",
	"NUTRIA"
]

    # intancie services uvicorn
    
    uvicorn.run(
        "src.api.app:app",
        host=settings.HOSTAPI,
        port=settings.PORTAPI,
        log_level=settings.LEVEL_LOG,
        workers=settings.WORKERS  # Producción: usa múltiples workers si tienes CPU suficiente
    )



# Add and commit the letter soup
if __name__ == "__main__":
    main()
