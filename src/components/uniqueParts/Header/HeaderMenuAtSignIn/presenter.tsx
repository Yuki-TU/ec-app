import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { push } from 'connected-react-router';
import React, { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../../../reducks/users/operations';
import { IconButton } from '../../../uiParts/IconButton';
import { Menu } from '../../../uiParts/Menu';

/**
 * ログイン時のヘッダーメニューコンポーネント
 * @returns コンポーネント
 */
function HeaderMenuAtSignIn() {
  const dispatch = useDispatch();
  // メニュー開閉を担うステート
  const [openAccountMenu, setOpenAccountMenu] = useState(false);
  // アカウントアイコンののエレメント、アカウントめニューの表示位置の指定に利用
  const accountMenuAnchorRef = useRef<HTMLButtonElement>(null);

  const toggleAccountMenu = useCallback(() => {
    setOpenAccountMenu((prevOpenAccountMenu) => !prevOpenAccountMenu);
  }, [setOpenAccountMenu]);

  const accoutMenuItems = [
    {
      onClick: () => {
        dispatch(push('/account'));
      },
      label: 'アカウント情報',
    },
    {
      onClick: () => {
        dispatch(push('/favorite-products'));
      },
      label: 'お気に入り一覧',
    },
  ];

  return (
    <>
      <IconButton
        reference={accountMenuAnchorRef}
        onClick={toggleAccountMenu}
        icon={<PersonIcon />}
        label="アカウント"
      />
      <Menu
        menuItems={accoutMenuItems}
        reference={accountMenuAnchorRef}
        openMenu={openAccountMenu}
        setOpenMenu={setOpenAccountMenu}
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
