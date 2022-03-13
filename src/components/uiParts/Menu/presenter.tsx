import {
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@material-ui/core';
import React, { useEffect, useRef } from 'react';

type MenuProps = {
  /** 各メニューの設定 */
  menuItems: { onClick: () => void; label: string }[];
  /** 表示する位置 */
  reference: React.RefObject<HTMLButtonElement> | null | undefined;
  /** メニューの開閉を管理するステート値 */
  openMenu: boolean;
  /** メニューの開閉を管理するステートメソッド */
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
};
/**
 * メニューコンポーネント
 * @param props menuItems: メニューせ亭, reference: 参照場所, openMenu: メニュー開閉フラグ, setOpenMenu: メニュー開閉フラグ制御
 * @returns コンポーネント
 */
function Menu(props: MenuProps) {
  const { menuItems, reference, openMenu, setOpenMenu } = props;

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
    <Popper
      open={openMenu}
      anchorEl={reference?.current}
      role={undefined}
      transition
      disablePortal
    >
      {({ TransitionProps }) => (
        <Grow
          in={TransitionProps?.in}
          onEnter={TransitionProps?.onEnter}
          onExited={TransitionProps?.onExited}
        >
          <Paper>
            <ClickAwayListener onClickAway={closeMenu}>
              <MenuList autoFocusItem={openMenu} onKeyDown={handleListKeyDown}>
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.label}
                    onClick={(event) => {
                      item.onClick();
                      closeMenu(event);
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}

export default Menu;
