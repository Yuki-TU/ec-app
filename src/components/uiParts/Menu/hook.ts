import React, { useEffect, useRef } from 'react';

/**
 * メニューが閉じるとフォーカスをメニューボタンに戻す
 * @param isOpenMenu メニュー開閉フラグ
 * @param reference メニュー表示位置
 */
export function useFocusBack(
  isOpenMenu: boolean,
  reference: React.RefObject<HTMLButtonElement> | null | undefined
) {
  const prevOpenAccountMenu = useRef(isOpenMenu);
  useEffect(() => {
    // メニュー開いて、閉じてからのフォーカスをメニューボタンに戻す
    if (prevOpenAccountMenu.current && !isOpenMenu) {
      reference?.current?.focus();
    }
    // メニュー開閉フラグ更新
    prevOpenAccountMenu.current = isOpenMenu;
  }, [isOpenMenu]);
}
