import { makeStyles } from '@material-ui/styles';

/** スタイル */
export const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
  label: {
    fontSize: '0.8rem',
  },
  inputfile: {
    display: 'none',
  },
  images: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
});
