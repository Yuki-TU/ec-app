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
  grid: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
}));
