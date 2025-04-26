import React, { useState, useEffect } from 'react';
import LetterTable from './LetterTable';
import WordsList from './WordsList';
import { saveLetterSoup, resolveLetterSoup } from '../api/api';
import { COLORS } from '../config';

const LetterSoupTable = ({ sopa, palabras }) => {
  const [tabla, setTabla] = useState([]);
  const [filas, setFilas] = useState(14);
  const [columnas, setColumnas] = useState(14);
  const [palabrasArray, setPalabrasArray] = useState([]);
  const [sopaId, setSopaId] = useState(null);
  const [coordenadasResaltadas, setCoordenadasResaltadas] = useState({});
  const [palabrasConCoordenadas, setPalabrasConCoordenadas] = useState([]);
  const [error, setError] = useState(null);

  // Procesa la sopa y la guarda
  useEffect(() => {
    const fetchData = async () => {
      if (sopa && sopa.trim()) {
        const sopaArray = sopa
          .split('\n')
          .map(row => row.split(',').map(cell => cell.trim().toUpperCase()));

        try {
          const res = await saveLetterSoup({ "matrix": sopaArray });
          setSopaId(res.data.id);
        } catch (error) {
          console.error('Error guardando sopa', error);
          setError('Error al guardar la sopa de letras');
        }

        setFilas(sopaArray.length);
        setColumnas(sopaArray[0].length);
        setTabla(sopaArray);
      }
    };

    fetchData();
  }, [sopa]);

  // Procesa las palabras y obtiene las coordenadas
  useEffect(() => {
    const fetchData = async () => {
      if (palabras && sopaId) {
        const palabrasArray = palabras.split(/[\n\s]+/).filter(p => p.trim() !== '');
        setPalabrasArray(palabrasArray);

        try {
          const response = await resolveLetterSoup({
            id: sopaId,
            words: palabrasArray
          });
          
          // Filtramos solo las palabras que tienen coordenadas
          const palabrasConCoords = response.data.filter(item => 
            item.coordinates && item.coordinates.length > 0
          );
          
          setPalabrasConCoordenadas(palabrasConCoords);
          
          // Generamos el mapa de colores para las coordenadas
          const colorMap = {};
          palabrasConCoords.forEach((palabra, index) => {
            const color = COLORS[index % COLORS.length];
            palabra.coordinates.forEach(([i, j]) => {
              colorMap[`${i},${j}`] = color;
            });
          });
          
          setCoordenadasResaltadas(colorMap);
          setError(null);
          
        } catch (error) {
          console.error('Error resolviendo palabras', error);
          setError('Error al resolver las palabras. Verifica el formato de la respuesta.');
          setPalabrasConCoordenadas([]);
          setCoordenadasResaltadas({});
        }
      }
    };

    fetchData();
  }, [palabras, sopaId]);

  const handleChange = (rowIndex, colIndex, value) => {
    if (rowIndex >= 0 && rowIndex < filas && colIndex >= 0 && colIndex < columnas) {
      const newTabla = [...tabla];
      newTabla[rowIndex][colIndex] = value.toUpperCase();
      setTabla(newTabla);
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
          tabla={tabla}
          filas={filas}
          columnas={columnas}
          handleChange={handleChange}
          coordenadasResaltadas={coordenadasResaltadas}
        />
      </div>
      <div className="h-2/5">
        <WordsList 
          palabras={palabrasConCoordenadas.length > 0 ? palabrasConCoordenadas : palabrasArray} 
        />
      </div>
    </div>
  );
};

export default LetterSoupTable;