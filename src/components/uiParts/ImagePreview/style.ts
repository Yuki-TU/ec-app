import { makeStyles } from '@material-ui/styles';

/** スタイル */
export const useStyles = makeStyles({
  // 画像を２列にして表示
  root: {
    overflow: 'hidden',
    margin: '0.5rem',
    width: 'calc(50% - 1rem)',
    textAlign: 'center',
    '&::before': {
      content: '""', // この形にしないと適用されない
      display: 'block',
      padding: '1rem',
    },
  },
  image: {
    objectFit: 'cover',
    objectPosition: 'center',
    width: '10rem',
    height: '10rem',
  },
});
