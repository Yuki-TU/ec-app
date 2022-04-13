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
    padding: 0,
    marginRight: 0,
    marginLeft: 'auto',
  },
  imageBox: {
    position: 'relative',
  },
  solidOut: {
    position: 'absolute',
    borderTop: '40px solid #ff0000',
    borderRight: '40px solid transparent',
    borderBottom: '40px solid transparent',
    borderLeft: '40px solid #ff0000',
  },
  solidOutText: {
    left: '-33px',
    top: '-25px',
    position: 'absolute',
    color: '#ffffffff',
    transform: 'rotate(-45deg)',
    WebkitTransform: 'rotate(-45deg)',
    backgroundColor: 'transparent',
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },
  media: {
    cursor: 'pointer',
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
