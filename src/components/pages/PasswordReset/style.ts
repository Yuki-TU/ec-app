import { makeStyles } from '@material-ui/styles';

/** スタイル */
export const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    maxWidth: '400px',
    padding: '1rem',
    height: 'auto',
    width: 'calc(100% - 2rem)',
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#4dd0e1',
    fontSize: '1.563rem',
    margin: '0 auto 1rem auto',
  },
  button: {
    marginTop: '5rem',
  },
});
