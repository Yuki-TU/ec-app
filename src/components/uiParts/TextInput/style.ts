import { makeStyles } from '@material-ui/styles';

/** スタイル設定 */
export const useStyles = makeStyles({
  full: {
    marginBottom: 16,
  },
  half: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 16,
    minWidth: 130,
    width: 'calc(50% - 16px)',
  },
});
