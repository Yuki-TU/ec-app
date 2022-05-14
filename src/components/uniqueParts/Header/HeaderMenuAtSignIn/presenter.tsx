import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { Action } from '@reduxjs/toolkit';
import React from 'react';
import { IconButton } from '../../../uiParts/IconButton';
import { Menu } from '../../../uiParts/Menu';

type Props = {
  /** アカウントメニュー表示位置 */
  accountMenuAnchorRef: React.RefObject<HTMLButtonElement>;
  /** アカウントメニュー開閉途toggle関数 */
  toggleAccountMenu: () => void;
  /** アカウントメニュー一覧 */
  accoutMenuItems: {
    onClick: () => void;
    label: string;
  }[];
  /** アカウント開閉フラグ */
  isOpenAccountMenu: boolean;
  /** サインアウトする */
  onClickSignOut: () => (dispatch: React.Dispatch<Action>) => Promise<void>;
  /** アカウントメニューを閉じる */
  closeAccountMenu: () => void;
  /** 出品ボタンを押した時 */
  onClickExhibit: () => void;
};

/**
 * ログイン時のヘッダーメニューコンポーネント
 * @returns コンポーネント
 */
const HeaderMenuAtSignInPresenter = React.memo(
  ({
    accountMenuAnchorRef,
    toggleAccountMenu,
    accoutMenuItems,
    isOpenAccountMenu,
    onClickSignOut,
    onClickExhibit,
    closeAccountMenu,
  }: Props) => (
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
        isOpenMenu={isOpenAccountMenu}
        closeMenu={closeAccountMenu}
      />
      <IconButton
        onClick={onClickExhibit}
        icon={<PhotoCameraIcon />}
        label="出品"
      />
      <IconButton
        onClick={onClickSignOut}
        icon={<ExitToAppIcon />}
        label="サインアウト"
      />
    </>
  )
);

export default HeaderMenuAtSignInPresenter;
