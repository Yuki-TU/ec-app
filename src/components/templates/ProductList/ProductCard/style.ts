import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

/** スタイル */
export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      // スマホ
      margin: 2, // マージン上下左右2px
      width: 'calc(50% - 4px)', // 一つのカードの幅を親要素の幅の50%, -4pxはマージン分2px*2
    },
    [theme.breakpoints.up('md')]: {
      // PC
      margin: 16,
      width: 'calc(25% - 32px)',
    },
  },
  content: {
    display: 'flex',
    padding: '16 8',
    textAlign: 'left',
    '&:last-child': {
      paddingBottom: 16,
    },
  },
  icon: {
    marginRight: 0,
    marginLeft: 'auto',
  },
  media: {
    height: 0,
    paddingTop: '100%',
  },
  price: {
    color: theme.palette.secondary.dark,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1rem',
    },
  },
  productName: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1rem',
    },
  },
}));
