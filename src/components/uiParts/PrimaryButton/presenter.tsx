import React from 'react';
import Button from '@material-ui/core/Button';

/** ボタンコンポーネントの型定義 */
export type PrimaryButtonProps = {
  /** 有効フラグ */
  disabled?: boolean;
  /** ボタンに表記するラベル */
  label: string;
  /** ボタンタイプ(buttn | submit | reset) */
  type: 'button' | 'submit';
  /** ボタンを押された時のコールバック関数 */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

/**
 * ボタンの汎用コンポーネント
 * @param props 各種設定
 * @return コンポーネント
 */
const PrimaryButton = React.memo(
  ({
    label,
    onClick = () => {},
    type,
    disabled = false,
  }: PrimaryButtonProps) => (
    <Button
      className="mb-[16px] w-full h-[40px] font-[16px] text-white bg-green-500 hover:bg-green-700"
      variant="contained"
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {label}
    </Button>
  )
);

export default PrimaryButton;
