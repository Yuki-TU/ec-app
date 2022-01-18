import React from 'react';
import { useStyles } from './style';

/** テキストリンクの引き数の方 */
type TextLinkProps = {
  /** リンクの表示名 */
  label: string;
  /** リンクを押下した時のコールバック(画面性に利用)) */
  onClick: React.ReactEventHandler<HTMLDivElement>;
};

/**
 * テキストリンクのコンポーネント、
 * マウスクリックだけでなく、タブ選択もできる
 * @param props - label: 表示ラベル, onClick: クリックされた時のコールバック
 * @returns
 */
function TextLink(props: TextLinkProps) {
  const classes = useStyles();
  const { label, onClick } = props;

  return (
    <div
      className={classes.root}
      role="link"
      tabIndex={0}
      onClick={onClick}
      onKeyPress={onClick}
    >
      {label}
    </div>
  );
}

export default TextLink;
