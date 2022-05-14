import { Badge, IconButton as MuiIconButton } from '@material-ui/core';
import React from 'react';

export type IconProps = {
  /** 表示するアイコン */
  icon: JSX.Element;
  /** クリック時のコールバック */
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  /** ラベル */
  label?: string;
  /** バッジカウンタ数 */
  badgeContent?: number;
  /** 表示位置のための参照 */
  reference?: React.RefObject<HTMLButtonElement> | null | undefined;
};
/**
 * アイコンブタンコンポーネント
 * @param param label: テキストラベル, icon: materialuiアイコン, onClick: callback, badgeContent: バッジ数, ref?: 表示位置のための参照
 * @returns
 */
const IconButton = React.memo(
  ({
    label = '',
    icon,
    onClick,
    badgeContent = 0,
    reference = undefined,
  }: IconProps) => (
    <MuiIconButton onClick={onClick} ref={reference}>
      <div className="block sm:flex">
        <Badge badgeContent={badgeContent} color="secondary">
          {icon}
        </Badge>
        <span className="block text-[0.3rem] sm:flex sm:text-[0.9rem]">
          {label}
        </span>
      </div>
    </MuiIconButton>
  )
);

export default IconButton;
