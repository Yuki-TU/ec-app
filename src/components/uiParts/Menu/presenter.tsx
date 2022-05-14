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
  /** メニューの開閉フラグ */
  isOpenMenu: boolean;
  /** メニュー閉じる */
  closeMenu: () => void;
};

type Props = {
  /** どれかキーダウンした時に走る関数 */
  handleListKeyDown: (event: React.KeyboardEvent) => void;
} & MenuProps;

/**
 * メニューコンポーネント
 * @param props menuItems: メニューせ亭, reference: 参照場所, isOpenMenu: メニュー開閉フラグ, setOpenMenu: メニュー開閉フラグ制御
 * @returns コンポーネント
 */
const MenuPresenter = React.memo(
  ({
    menuItems,
    reference,
    isOpenMenu,
    closeMenu,
    handleListKeyDown,
  }: Props) => (
    <Popper
      open={isOpenMenu}
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
              <MenuList
                autoFocusItem={isOpenMenu}
                onKeyDown={handleListKeyDown}
              >
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.label}
                    onClick={() => {
                      item.onClick();
                      closeMenu();
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
  )
);

export default MenuPresenter;
