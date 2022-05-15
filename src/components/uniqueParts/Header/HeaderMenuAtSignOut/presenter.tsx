import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import React from 'react';
import { IconButton } from '../../../uiParts/IconButton';

type Props = {
  /** サインアウト画面への遷移 */
  onClickSignOut: React.MouseEventHandler<HTMLButtonElement>;
  /** サイン イン画面に遷移 */
  onClickSignIn: React.MouseEventHandler<HTMLButtonElement>;
};
/**
 * アカウントログアウト時のヘッダーメニュー
 * @returns コンポーネント
 */
const HeaderMenuAtSignOutPresenter = React.memo(
  ({ onClickSignIn, onClickSignOut }: Props) => (
    <>
      <IconButton
        label="サインイン"
        onClick={onClickSignIn}
        icon={<ExitToAppIcon />}
      />
      <IconButton
        label="会員登録"
        onClick={onClickSignOut}
        icon={<PersonAddIcon />}
      />
    </>
  )
);

export default HeaderMenuAtSignOutPresenter;
