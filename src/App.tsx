import React from 'react';
import Router from './Router';

/**
 * ページ全体の関数コンポーネント
 * @return ページ全体のコンポーネント
 */
function App() {
  return (
    <div>
      <main>
        <Router />
      </main>
    </div>
  );
}

export default App;
