from dataclasses import field, dataclass
from typing import Dict, List, Tuple, Set
from src.models.model import keywords

@dataclass
class GameLetterSoup:
    letter_soup: List[List[str]]  
    words_list: List[str]
    __addresses: List[Tuple[int, int]] = field(init=False, default_factory=lambda: [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1)])
    __response: Dict[str, Dict[str, object]] = field(init=False, default_factory=dict)

    def __is_valid_position(self, x: int, y: int) -> bool:
        """Check if the position (x, y) is valid within the letter soup."""
        return 0 <= x < len(self.letter_soup) and 0 <= y < len(self.letter_soup[0])

    def __search_word(self, x: int, y: int, word: str, index: int, direction: Tuple[int, int], 
                     path: List[Tuple[int, int]], used_positions: Set[Tuple[int, int]]) -> bool:
        """Recursively search for the word in the letter soup."""
        if index == len(word):
            return True
        
        
        if (x, y) in used_positions or not self.__is_valid_position(x, y) or self.letter_soup[x][y] != word[index]:
            return False
        
        
        used_positions.add((x, y))
        path.append((x, y))
        
        dx, dy = direction
        new_x = x + dx
        new_y = y + dy
        
        if self.__search_word(new_x, new_y, word, index + 1, direction, path, used_positions):
            return True
        
        
        used_positions.remove((x, y))
        path.pop()
        
        return False
    
    def __resolver_letter_soup(self, word: str) -> Tuple[bool, List[Tuple[int, int]]]:
        """Find the word in the letter soup and return its positions."""
        for i in range(len(self.letter_soup)):
            for j in range(len(self.letter_soup[0])):
                if self.letter_soup[i][j] == word[0]:
                    path = []
                    used_positions = set()  
                    for direction in self.__addresses:
                        if self.__search_word(i, j, word, 0, direction, path, used_positions):
                            return True, path
        return False, []
    
    def response_result(self) -> Dict[str, Dict[str, object]]:
        """Get the response for all words in the list."""
        
        sorted_words = sorted(self.words_list, key=lambda w: -len(w))
        
        for word in sorted_words:
            found, positions = self.__resolver_letter_soup(word)
            self.__response[word] = {}
            if found:
                self.__response[word][keywords.FOUND.value] = True
                self.__response[word][keywords.COORDINATES.value] = positions
            else:
                self.__response[word][keywords.FOUND.value] = False
         
        return self.__response