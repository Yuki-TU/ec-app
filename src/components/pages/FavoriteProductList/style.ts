import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

/** スタイル */
export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: '0 auto',
    position: 'relative',
    width: '100%',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '575px',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '1024px',
    },
  },
  headerTitle: {
    textAlign: 'center',
    color: '#4dd0e1',
    fontSize: '1.563rem',
    margin: '0 auto 1rem auto',
  },
  noFavoriteText: {
    fontSize: '1.3rem',
    margin: '5rem auto 1rem auto',
  },
}));
