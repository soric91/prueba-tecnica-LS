import { useState } from 'react';


export const useLetterSoup = () => {
  const [soup, setSoup] = useState('');
  const [words, setWords] = useState('');
 


  const updateData = (newSoup, newWords) => {
    setSoup(newSoup);
    setWords(newWords);
  };


  return { soup, words, updateData };
};
