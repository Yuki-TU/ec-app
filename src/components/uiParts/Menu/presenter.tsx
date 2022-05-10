import {
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@material-ui/core';
import React from 'react';

export type MenuProps = {
  /** 各メニューの設定 */
  menuItems: { onClick: () => void; label: string }[];
  /** 表示する位置 */
  reference: React.RefObject<HTMLButtonElement> | null | undefined;
  /** メニューの開閉を管理するステート値 */
  openMenu: boolean;
  /** メニューの開閉を管理するステートメソッド */
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = {
  /** メニュー閉じる */
  closeMenu: (event: React.MouseEvent<EventTarget>) => void;
  /** どれかキーダウンした時に走る関数 */
  handleListKeyDown: (event: React.KeyboardEvent) => void;
} & MenuProps;

/**
 * メニューコンポーネント
 * @param props menuItems: メニューせ亭, reference: 参照場所, openMenu: メニュー開閉フラグ, setOpenMenu: メニュー開閉フラグ制御
 * @returns コンポーネント
 */
function MenuPresenter(props: Props) {
  const { menuItems, reference, openMenu, closeMenu, handleListKeyDown } =
    props;

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

export default React.memo(MenuPresenter);
