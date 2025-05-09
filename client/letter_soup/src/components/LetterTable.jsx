import React from 'react';

const LetterTable = ({ table, rows, columns, handleChange, highlightedCoordinates }) => {
  const generateEmptyTable = () => {
    return Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => '')
    );
  };

  const tableToDisplay = Array.isArray(table) && table.length > 0 ? table : generateEmptyTable();

  const getHighlightColor = (row, col) => {
    const key = `${row},${col}`;
    return highlightedCoordinates?.[key] || null;
  };

  return (
    <div className="flex justify-center items-center min-h-[300px] border border-blue-400 bg-opacity-20 rounded p-2">
      <table className="table-auto border-collapse border border-gray-600">
        <tbody>
          {tableToDisplay.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => {
                const bgColor = getHighlightColor(rowIndex, colIndex);
                return (
                  <td key={colIndex} className="border border-gray-600 p-0">
                    <input
                      type="text"
                      maxLength={1}
                      value={cell}
                      onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                      className={`w-6 h-6 text-center border-none focus:ring-0 ${
                        bgColor ? 'text-black font-bold' : 'bg-gray-800 text-white'
                      }`}
                      style={{ backgroundColor: bgColor || '' }}
                      placeholder="X"
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LetterTable;