export const parseSoup = (soupText) =>
    soupText
      .split('\n')
      .map(row => row.split(',').map(cell => cell.trim().toUpperCase()));
  
export const parseWords = (wordsText) =>
    wordsText.split(/[\n\s]+/).filter(w => w.trim() !== '');
  