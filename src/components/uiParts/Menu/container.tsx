import React, { useEffect, useRef } from 'react';
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

  const prevOpenAccountMenu = useRef(isOpenMenu);
  useEffect(() => {
    // メニュー開いて、閉じてからのフォーカスをメニューボタンに戻す
    if (prevOpenAccountMenu.current && !isOpenMenu) {
      reference?.current?.focus();
    }
    // メニュー開閉フラグ更新
    prevOpenAccountMenu.current = isOpenMenu;
  }, [isOpenMenu]);

  return <MenuPresenter {...props} handleListKeyDown={handleListKeyDown} />;
});

export default MenuContainer;
