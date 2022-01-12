import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Router from './Router';

/** スタイル */
const useStyles = makeStyles({
  root: {
    fontSize: '62.5%',
  },
});

/**
 * ページ全体の関数コンポーネント
 * @return ページ全体のコンポーネント
 */
function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <main>
        <Router />
      </main>
    </div>
  );
}

export default App;
