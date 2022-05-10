import React, { useEffect, useRef } from 'react';
import MenuPresenter, { MenuProps } from './presenter';

/**
 * メニューのコンテンアコンポーネント
 * @param props パラメータ
 * @returns コンテナコンポーネント
 */
function MenuContainer(props: MenuProps) {
  const { reference, openMenu, setOpenMenu } = props;
  const closeMenu = (event: React.MouseEvent<EventTarget>) => {
    if (
      reference?.current &&
      reference?.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpenMenu(false);
  };

  // タブを押したらメニューを閉じる
  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenMenu(false);
    }
  };

  const prevOpenAccountMenu = useRef(openMenu);
  useEffect(() => {
    // メニュー開いて、閉じてからのフォーカスをメニューボタンに戻す
    if (prevOpenAccountMenu.current && !openMenu) {
      reference?.current?.focus();
    }
    // メニュー開閉フラグ更新
    prevOpenAccountMenu.current = openMenu;
  }, [openMenu]);

  return (
    <MenuPresenter
      {...props}
      handleListKeyDown={React.useCallback(handleListKeyDown, [setOpenMenu])}
      closeMenu={React.useCallback(closeMenu, [setOpenMenu])}
    />
  );
}

export default React.memo(MenuContainer);
