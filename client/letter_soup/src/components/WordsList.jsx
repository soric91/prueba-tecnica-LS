import React from 'react';
import { COLORS } from '../config';

const WordsList = ({ palabras }) => {
  return (
    <div className="flex flex-col justify- min-h-[200px] p-2 border border-blue-400 bg-gray-800 bg-opacity-40 rounded">
      <div className="flex items-start p-2 border border-blue-400 bg-gray-700 bg-opacity-30 rounded mb-2">
        <div className="text-white">
          {palabras && palabras.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {palabras.map((item, index) => {
                const palabra = typeof item === 'object' ? item.word : item;
                const color = COLORS[index % COLORS.length];
                const hasBackground = typeof item === 'object';
                
                return (
                  <span 
                    key={index} 
                    className={`px-2 py-1 rounded ${hasBackground ? 'font-bold' : ''}`}
                    style={{
                      backgroundColor: hasBackground ? color : 'transparent',
                      color: hasBackground ? '#000000' : '#FFFFFF' 
                    }}
                  >
                    {palabra}
                  </span>
                );
              })}
            </div>
          ) : (
            <span className="text-gray-400">No hay palabras para buscar</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordsList;