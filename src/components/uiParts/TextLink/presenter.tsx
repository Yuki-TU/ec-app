import React from 'react';

/** テキストリンクの引き数の方 */
type TextLinkProps = {
  /** リンクの表示名 */
  label: string;
  /** リンクを押下した時のコールバック(画面性に利用)) */
  onClick: React.ReactEventHandler<HTMLDivElement>;
};

/**
 * テキストリンクのコンポーネント
 *
 * マウスクリックだけでなく、タブ選択もできる
 * @param props - label: 表示ラベル, onClick: クリックされた時のコールバック
 * @returns
 */
const TextLink = React.memo(({ label, onClick }: TextLinkProps) => (
  <div
    className="m-2 text-[0.8rem] cursor-pointer"
    role="link"
    tabIndex={0}
    onClick={onClick}
    onKeyPress={onClick}
  >
    {label}
  </div>
));

export default TextLink;
