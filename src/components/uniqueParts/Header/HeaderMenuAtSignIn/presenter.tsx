import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { push } from 'connected-react-router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../../../reducks/users/operations';
import { IconButton } from '../../../uiParts/IconButton';

/**
 * ログイン時のヘッダーメニューコンポーネント
 * @returns コンポーネント
 */
function HeaderMenuAtSignIn() {
  const dispatch = useDispatch();

  return (
    <>
      <IconButton
        onClick={() => dispatch(push('/signout'))}
        icon={<PersonIcon />}
        label="アカウント"
      />
      <IconButton
        onClick={() => dispatch(push('/product/edit'))}
        icon={<PhotoCameraIcon />}
        label="出品"
      />
      <IconButton
        onClick={() => dispatch(signOut())}
        icon={<ExitToAppIcon />}
        label="サインアウト"
      />
    </>
  );
}
export default HeaderMenuAtSignIn;
