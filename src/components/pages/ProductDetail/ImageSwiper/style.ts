import { makeStyles } from '@material-ui/styles';

/** スタイル */
export const useStyles = makeStyles({
  mainGallerySlide: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    '&::before': {
      content: '""', // この形にしないと適用されない
      display: 'block',
      paddingTop: '100%',
    },
  },
  mainGalleryImage: {
    position: 'absolute',
    display: 'inline-block',
    // 画像の表示アスペクト比の設定
    objectFit: 'cover',
    objectPosition: 'center',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  mainGallery: {
    height: 'auto',
    width: '100%',
  },
  thumbnailGallery: {
    height: '20%',
    boxSizing: 'border-box',
    padding: '10px 0',
  },
  thumbnailGallerySlide: {
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    '&::before': {
      content: '""', // この形にしないと適用されない
      display: 'block',
      paddingTop: '40%',
    },
  },
  thumbnailGalleryImage: {
    position: 'absolute',
    display: 'inline-block',
    objectFit: 'cover',
    objectPosition: 'center',
    top: 0,
    left: 0,
    width: '100%',
    height: '80%',
  },
});
