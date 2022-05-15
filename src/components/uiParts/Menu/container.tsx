import React from 'react';
import { useFocusBack } from './hook';
import MenuPresenter, { MenuProps } from './presenter';

/**
 * メニューのコンテンアコンポーネント
 * @param props パラメータ
 * @returns コンテナコンポーネント
 */
const MenuContainer = React.memo((props: MenuProps) => {
  const { reference, isOpenMenu, closeMenu } = props;

  // タブを押したらメニューを閉じる
  const handleListKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        closeMenu();
      }
    },
    [closeMenu]
  );

  useFocusBack(isOpenMenu, reference);

  return <MenuPresenter {...props} handleListKeyDown={handleListKeyDown} />;
});

export default MenuContainer;
