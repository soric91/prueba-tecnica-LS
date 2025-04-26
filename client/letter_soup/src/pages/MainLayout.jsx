import React from 'react';
import Header from '../components/Header';
import LayoutContainer from '../components/LayoutContainer';
import LetterSoupForm from '../components/LetterSoupForm';
import LetterSoupTable from '../components/LetterSoupTable';
import { useLetterSoup } from '../hooks/useLetterSoup';

const MainLayout = () => {
  const { grid, words, updateData } = useLetterSoup();

  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 text-white">
      <Header />
      <LayoutContainer
        left={
          <>
            <h2 className="text-sky-400 text-center py-1 px-2 text-sm font-medium border-b border-gray-700">
              Enter your letter grid and word list
            </h2>
            <div className="flex-1 p-2 overflow-hidden">
              <LetterSoupForm onSubmit={updateData} />
            </div>
          </>
        }
        right={
          <>
            <h2 className="text-sky-400 text-center py-1 px-2 text-sm font-medium border-b border-gray-700">
              Letter Grid
            </h2>
            <div className="flex-2 p-2 overflow-hidden flex flex-col">
              <div className="h-5/5">
                <LetterSoupTable grid={grid} words={words} />
              </div>
            </div>
          </>
        }
      />
    </div>
  );
};

export default MainLayout;