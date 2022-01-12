import { createTheme } from '@material-ui/core/styles';

/**
 * テーマカラー
 * Pick colors on https://material.io/resources/color/#!/
 */
const theme = createTheme({
  palette: {
    primary: {
      light: '#88ffff',
      main: '#4dd0e1',
      dark: '#009faf',
      contrastText: '#000',
    },
    secondary: {
      light: '#ffff81',
      main: '#ffd54f',
      dark: '#c8a415',
      contrastText: '#000',
    },
  },
});

export default theme;
