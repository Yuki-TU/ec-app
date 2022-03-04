import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

/** スタイル */
export const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  label: {
    fontSize: '0.9rem',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.3rem',
      display: 'block',
    },
  },
}));
