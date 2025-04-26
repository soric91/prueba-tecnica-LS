import { useState } from 'react';

export const useLetterSoup = () => {
  const [grid, setGrid] = useState('');
  const [words, setWords] = useState('');

  const updateData = (newGrid, newWords) => {
    setGrid(newGrid);
    setWords(newWords);
  };

  return { grid, words, updateData };
};