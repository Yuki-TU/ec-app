import { makeStyles } from '@material-ui/styles';
import { createStyles, Theme } from '@material-ui/core';

/**
 * スタイル定義
 */
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      fontSize: 16,
      height: 48,
      marginBottom: 16,
      width: '100%',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  })
);
