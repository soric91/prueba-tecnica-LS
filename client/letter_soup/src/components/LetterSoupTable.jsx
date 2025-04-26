import React, { useState, useEffect } from 'react';
import LetterTable from './LetterTable';
import WordsList from './WordsList';
import { saveLetterSoup, resolveLetterSoup } from '../api/api';
import { COLORS } from '../config';

const LetterSoupTable = ({ grid, words }) => {
  const [table, setTable] = useState([]);
  const [rows, setRows] = useState(14);
  const [columns, setColumns] = useState(14);
  const [wordsArray, setWordsArray] = useState([]);
  const [gridId, setGridId] = useState(null);
  const [highlightedCoordinates, setHighlightedCoordinates] = useState({});
  const [wordsWithCoordinates, setWordsWithCoordinates] = useState([]);
  const [error, setError] = useState(null);

  // Process the grid and save it
  useEffect(() => {
    const fetchData = async () => {
      if (grid && grid.trim()) {
        const gridArray = grid
          .split('\n')
          .map(row => row.split(',').map(cell => cell.trim().toUpperCase()));

        try {
          const res = await saveLetterSoup({ "matrix": gridArray });
          setGridId(res.data.id);
        } catch (error) {
          console.error('Error saving grid', error);
          setError('Error saving letter grid');
        }

        setRows(gridArray.length);
        setColumns(gridArray[0].length);
        setTable(gridArray);
      }
    };

    fetchData();
  }, [grid]);

  // Process the words and get coordinates
  useEffect(() => {
    const fetchData = async () => {
      if (words && gridId) {
        const wordsArray = words.split(/[\n\s]+/).filter(w => w.trim() !== '');
        setWordsArray(wordsArray);

        try {
          const response = await resolveLetterSoup({
            id: gridId,
            words: wordsArray
          });
          
          // Filter only words that have coordinates
          const wordsWithCoords = response.data.filter(item => 
            item.coordinates && item.coordinates.length > 0
          );
          
          setWordsWithCoordinates(wordsWithCoords);
          
          // Generate color map for coordinates
          const colorMap = {};
          wordsWithCoords.forEach((word, index) => {
            const color = COLORS[index % COLORS.length];
            word.coordinates.forEach(([i, j]) => {
              colorMap[`${i},${j}`] = color;
            });
          });
          
          setHighlightedCoordinates(colorMap);
          setError(null);
          
        } catch (error) {
          console.error('Error resolving words', error);
          setError('Error resolving words. Please check the response format.');
          setWordsWithCoordinates([]);
          setHighlightedCoordinates({});
        }
      }
    };

    fetchData();
  }, [words, gridId]);

  const handleChange = (rowIndex, colIndex, value) => {
    if (rowIndex >= 0 && rowIndex < rows && colIndex >= 0 && colIndex < columns) {
      const newTable = [...table];
      newTable[rowIndex][colIndex] = value.toUpperCase();
      setTable(newTable);
    }
  };

  return (
    <div className="flex flex-col h-full gap-2">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <div className="flex-1">
        <LetterTable
          table={table}
          rows={rows}
          columns={columns}
          handleChange={handleChange}
          highlightedCoordinates={highlightedCoordinates}
        />
      </div>
      <div className="h-2/5">
        <WordsList 
          words={wordsWithCoordinates.length > 0 ? wordsWithCoordinates : wordsArray} 
        />
      </div>
    </div>
  );
};

export default LetterSoupTable;