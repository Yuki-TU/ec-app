import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Header } from './components/uniqueParts/Header';
import Router from './Router';

const useStyles = makeStyles({
  main: {
    padding: '70px 0',
  },
});
/**
 * ページ全体の関数コンポーネント
 * @return ページ全体のコンポーネント
 */
function App() {
  const classes = useStyles();
  return (
    <>
      <header>
        <Header />
      </header>
      <main className={classes.main}>
        <Router />
      </main>
    </>
  );
}

export default App;
