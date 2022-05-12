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
  /** 表示位置のための参照 */
  reference?: React.RefObject<HTMLButtonElement> | null | undefined;
};
/**
 * アイコンブタンコンポーネント
 * @param param label: テキストラベル, icon: materialuiアイコン, onClick: callback, badgeContent: バッジ数, ref?: 表示位置のための参照
 * @returns
 */
function IconButton({
  label = '',
  icon,
  onClick,
  badgeContent = 0,
  reference = undefined,
}: IconProps) {
  const classes = useStyles();

  return (
    <MuiIconButton onClick={onClick} ref={reference}>
      <div className={classes.icon}>
        <Badge badgeContent={badgeContent} color="secondary">
          {icon}
        </Badge>
        <span className={classes.label}>{label}</span>
      </div>
    </MuiIconButton>
  );
}

export default React.memo(IconButton);
