import React, { useState } from 'react';

const LetterSoupForm = ({ onSubmit }) => {
  const [sopa, setSopa] = useState('');
  const [palabras, setPalabras] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sopa.trim() === '') {
      alert('Por favor ingresa una sopa de letras.');
      return;
    }
    // Pasamos los datos al componente padre
    onSubmit(sopa, palabras);  

    setSopa('');
    setPalabras('');
  };




  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label className="font-semibold text-sm text-gray-300">
        Enter your letter soup (one letter per cell, separated by commas or spaces):
        <textarea
          value={sopa}
          onChange={(e) => setSopa(e.target.value)}
          rows={7}
          className="w-full min-h-[350px] mt-5 p-2 border border-gray-600 rounded bg-gray-800 text-white font-mono text-sm resize-none"
          placeholder="N, D, E, K, I, C, A, N, G, U, R, O, G, E\nS, X, R, Y, ..."
        />
      </label>

      <label className="font-semibold text-sm text-gray-300">
          Words to search for (one per line or separated by spaces):
          <textarea
            value={palabras}
            onChange={(e) => setPalabras(e.target.value)}
            rows={5} // Aumenta el número de filas visibles
            className="w-full min-h-[100px] mt-1 p-2 border border-gray-600 rounded bg-gray-800 text-white font-mono text-sm resize-none overflow-y-auto"
            placeholder="MANATI&#10;PERRO&#10;GATO..."
            style={{ whiteSpace: 'pre' }} // Conserva los saltos de línea exactos
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