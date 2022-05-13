import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { push } from 'connected-react-router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { IconButton } from '../../../uiParts/IconButton';

/**
 * アカウントログアウト時のヘッダーメニュー
 * @returns コンポーネント
 */
const HeaderMenuAtSignOut = React.memo(() => {
  const dispatch = useDispatch();

  return (
    <>
      <IconButton
        label="サインイン"
        onClick={() => {
          dispatch(push('/signin'));
        }}
        icon={<ExitToAppIcon />}
      />
      <IconButton
        label="会員登録"
        onClick={() => {
          dispatch(push('/signup'));
        }}
        icon={<PersonAddIcon />}
      />
    </>
  );
});
export default HeaderMenuAtSignOut;
