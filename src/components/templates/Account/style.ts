import { makeStyles } from '@material-ui/styles';

/** スタイル */
export const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    boxSizing: 'border-box',
    maxWidth: '1024px',
    padding: '1rem',
    height: 'auto',
    width: 'calc(100% - 2rem)',
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: '1.4rem',
    margin: '0 auto 1rem auto',
  },
  item: {
    fontSize: '1rem',
  },
  itemText: {
    fontSize: '0.8rem',
  },
});
