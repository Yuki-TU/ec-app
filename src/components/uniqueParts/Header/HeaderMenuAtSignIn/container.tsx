import { push } from 'connected-react-router';
import React, { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../../../reducks/users/operations';
import HeaderMenuAtSignInPresenter from './presenter';

/**
 * ログイン時のヘッダーメニューコンポーネント
 * @returns コンポーネント
 */
const HeaderMenuAtSignIn = React.memo(() => {
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
        dispatch(push('/exhibited-products'));
      },
      label: '出品商品一覧',
    },
    {
      onClick: () => {
        dispatch(push('/favorite-products'));
      },
      label: 'お気に入り一覧',
    },
  ];

  const onClickSignOut = React.useCallback(
    () => dispatch(signOut()),
    [signOut]
  );
  const onClickExhibit = React.useCallback(
    () => dispatch(push('/edit-product')),
    []
  );

  const closeAccountMenu = React.useCallback(() => {
    setOpenAccountMenu(false);
  }, [setOpenAccountMenu]);

  return (
    <HeaderMenuAtSignInPresenter
      accountMenuAnchorRef={accountMenuAnchorRef}
      onClickSignOut={onClickSignOut}
      accoutMenuItems={accoutMenuItems}
      isOpenAccountMenu={openAccountMenu}
      toggleAccountMenu={toggleAccountMenu}
      closeAccountMenu={closeAccountMenu}
      onClickExhibit={onClickExhibit}
    />
  );
});
export default HeaderMenuAtSignIn;
