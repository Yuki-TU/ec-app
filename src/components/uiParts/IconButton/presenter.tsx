import { Badge, IconButton as MuiIconButton } from '@material-ui/core';
import React from 'react';
import { useStyles } from './style';

export type IconProps = {
  /** 表示するアイコン */
  icon: JSX.Element;
  /** クリック時のコールバック */
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  /** ラベル */
  label?: string;
  /** バッジカウンタ数 */
  badgeContent?: number;
};
/**
 * アイコンブタンコンポーネント
 * @param param label: テキストラベル, icon: materialuiアイコン, onClick: callback, badgeContent: バッジ数
 * @returns
 */
function IconButton({
  label = '',
  icon,
  onClick,
  badgeContent = 0,
}: IconProps) {
  const classes = useStyles();

  return (
    <MuiIconButton onClick={onClick}>
      <div className={classes.icon}>
        <Badge badgeContent={badgeContent} color="secondary">
          {icon}
        </Badge>
        <span className={classes.label}>{label}</span>
      </div>
    </MuiIconButton>
  );
}

export default IconButton;