import React from 'react';
import { Header } from './components/uniqueParts/Header';
import Router from './Router';

/**
 * ページ全体の関数コンポーネント
 * @return ページ全体のコンポーネント
 */
function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className="py-[70px]">
        <Router />
      </main>
    </>
  );
}

export default App;
