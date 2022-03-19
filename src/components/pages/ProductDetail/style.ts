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
    [theme.breakpoints.up('sm')]: {
      maxWidth: '1024px',
    },
  },
  imageAndDetailGrid: {
    display: 'flex',
    flexFlow: 'row wrap',
    gap: '0 2.5rem',
  },
  imageSliderBox: {
    flex: 6,
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 2rem auto',
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      width: 400,
    },
  },
  productDetailDescription: {
    flex: 4,
    textAlign: 'left',
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 16px auto',
      width: '100%',
      padding: '0 1rem',
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      width: 400,
    },
  },
  productPrice: {
    fontSize: '1.4rem',
    margin: 0,
    color: theme.palette.primary.dark,
  },
  productName: {
    fontSize: '1.4rem',
    margin: '1rem 0 0.6rem 0',
  },
  productDescription: {
    fontSize: '0.9rem',
    margin: 0,
  },
  tax: {
    fontSize: '0.8rem',
    display: 'inline-block',
    margin: 0,
  },
  productInformationHeader: {
    display: 'inline-block',
  },
  productInformation: {
    display: 'inline-block',
    fontSize: '1rem',
    marginLeft: '3rem',
  },
}));
