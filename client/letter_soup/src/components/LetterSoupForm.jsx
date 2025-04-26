import React, { useState } from 'react';

const LetterSoupForm = ({ onSubmit }) => {
  const [grid, setGrid] = useState('');
  const [words, setWords] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (grid.trim() === '') {
      alert('Please enter a letter grid.');
      return;
    }
    // Pass data to parent component
    onSubmit(grid, words);  

    setGrid('');
    setWords('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label className="font-semibold text-sm text-gray-300">
        Enter your letter grid (one letter per cell, separated by commas or spaces):
        <textarea
          value={grid}
          onChange={(e) => setGrid(e.target.value)}
          rows={7}
          className="w-full min-h-[350px] mt-5 p-2 border border-gray-600 rounded bg-gray-800 text-white font-mono text-sm resize-none"
          placeholder="N, D, E, K, I, C, A, N, G, U, R, O, G, E\nS, X, R, Y, ..."
        />
      </label>

      <label className="font-semibold text-sm text-gray-300">
          Words to search for (one per line or separated by spaces):
          <textarea
            value={words}
            onChange={(e) => setWords(e.target.value)}
            rows={5}
            className="w-full min-h-[100px] mt-1 p-2 border border-gray-600 rounded bg-gray-800 text-white font-mono text-sm resize-none overflow-y-auto"
            placeholder="MANATEE&#10;DOG&#10;CAT..."
            style={{ whiteSpace: 'pre' }}
          />
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm mt-1"
      >
        Procesar
      </button>
    </form>
  );
};

export default LetterSoupForm;